const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

const SECRET_KEY            = process.env.SECRET_KEY || 'your-secret-key-change-this-in-production';
const SUPABASE_URL          = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Rate limiting — public POST submissions (in-memory, per IP)
const submitLog = new Map();
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Strict allowlists for enum fields
const VALID_AMOUNTS    = ['0-250', '250-1000', '1000-5000', '5000+'];
const VALID_SCAMTYPES  = ['crypto', 'broker', 'bank', 'card', 'other'];
const VALID_WHEN       = ['7days', '1-4weeks', '1-3months', '3+months'];
const VALID_PAYMENTS   = ['crypto', 'card', 'bank', 'other'];
const VALID_STATUSES   = ['new', 'contacted', 'qualified', 'in-progress', 'closed', 'rejected'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

function getClientIp(req) {
    return (
        (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
        req.headers['x-real-ip'] ||
        (req.socket && req.socket.remoteAddress) ||
        'unknown'
    );
}

function sanitize(val, maxLen) {
    if (typeof val !== 'string') return '';
    return val.slice(0, maxLen || 300).trim().replace(/[<>]/g, '');
}

function validateEmail(email) {
    return /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,}$/.test(email);
}

function authenticate(req) {
    const auth = req.headers['authorization'];
    if (!auth || !auth.startsWith('Bearer ')) return null;
    try { return jwt.verify(auth.slice(7), SECRET_KEY); } catch (e) { return null; }
}

// Map DB row (snake_case) → API response (camelCase)
function mapLead(row) {
    return {
        id:        row.id,
        name:      row.name,
        email:     row.email,
        phone:     row.phone || '',
        amount:    row.amount,
        scamType:  row.scam_type,
        when:      row.when_reported,
        payment:   row.payment,
        message:   row.message || '',
        status:    row.status,
        priority:  row.priority,
        notes:     row.notes || '',
        ip:        row.ip,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

function getSupabase() {
    return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
        auth: { persistSession: false }
    });
}

async function parseBody(req) {
    if (req.body && typeof req.body === 'object') return req.body;
    const raw = await new Promise((resolve, reject) => {
        let d = '';
        req.on('data', c => { d += c.toString(); });
        req.on('end', () => resolve(d));
        req.on('error', reject);
    });
    try { return JSON.parse(raw); } catch (e) { return {}; }
}

module.exports = async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
        return res.status(500).json({ error: 'Database not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to Vercel environment variables.' });
    }

    const supabase = getSupabase();

    // ── POST /api/leads  (public – submit a lead) ─────────────────────────
    if (req.method === 'POST') {
        const ip  = getClientIp(req);
        const now = Date.now();
        const log = submitLog.get(ip) || [];
        const recent = log.filter(t => now - t < WINDOW_MS);
        if (recent.length >= MAX_SUBMISSIONS) {
            return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
        }

        const body     = await parseBody(req);
        const name     = sanitize(body.name, 100);
        const email    = sanitize(body.email, 254);
        const phone    = sanitize(body.phone, 30);
        const amount   = sanitize(body.amount, 20);
        const scamType = sanitize(body.scamType, 20);
        const when     = sanitize(body.when, 20);
        const payment  = sanitize(body.payment, 20);
        const message  = sanitize(body.message, 2000);

        if (!name || name.length < 2)             return res.status(400).json({ error: 'Valid full name is required' });
        if (!validateEmail(email))                return res.status(400).json({ error: 'Valid email address is required' });
        if (!VALID_AMOUNTS.includes(amount))      return res.status(400).json({ error: 'Invalid amount selection' });
        if (!VALID_SCAMTYPES.includes(scamType))  return res.status(400).json({ error: 'Invalid fraud type selection' });
        if (when && !VALID_WHEN.includes(when))   return res.status(400).json({ error: 'Invalid timeframe selection' });
        if (payment && !VALID_PAYMENTS.includes(payment)) return res.status(400).json({ error: 'Invalid payment selection' });

        const priority = amount === '5000+' ? 'high' : amount === '1000-5000' ? 'medium' : 'low';

        const { data: newLead, error: insertErr } = await supabase
            .from('leads')
            .insert({
                name, email, phone, amount, message, priority,
                scam_type:     scamType,
                when_reported: when    || null,
                payment:       payment || null,
                status:        'new',
                notes:         '',
                ip,
            })
            .select()
            .single();

        if (insertErr) {
            console.error('Insert error:', insertErr);
            return res.status(500).json({ error: 'Failed to save lead. Please try again.' });
        }

        recent.push(now);
        submitLog.set(ip, recent);
        return res.status(201).json({ success: true, message: 'Lead submitted successfully', leadId: newLead.id });
    }

    // ── All other methods require admin authentication ─────────────────────
    const user = authenticate(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    if (user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

    const urlId = req.query && req.query.id ? parseInt(req.query.id, 10) : null;

    // ── GET /api/leads ────────────────────────────────────────────────────
    if (req.method === 'GET') {

        // CSV export
        if (req.url && req.url.includes('/export/csv')) {
            const { data: rows } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            const leads = (rows || []).map(mapLead);
            const csv = [
                'ID,Name,Email,Phone,Amount,Scam Type,When,Payment,Status,Priority,Message,Created',
                ...leads.map(l => [
                    l.id, l.name, l.email, l.phone, l.amount, l.scamType,
                    l.when, l.payment, l.status, l.priority,
                    (l.message || '').replace(/"/g, '""'), l.createdAt
                ].map(v => '"' + (v || '') + '"').join(','))
            ].join('\n');

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
            return res.status(200).send(csv);
        }

        // Single lead by ID
        if (urlId) {
            const { data: row, error } = await supabase
                .from('leads')
                .select('*')
                .eq('id', urlId)
                .single();
            if (error || !row) return res.status(404).json({ error: 'Lead not found' });
            return res.status(200).json({ success: true, lead: mapLead(row) });
        }

        // List leads
        const status   = req.query.status;
        const scamType = req.query.scamType;
        const search   = req.query.search;
        const page     = parseInt(req.query.page, 10) || 1;
        const limit    = Math.min(500, parseInt(req.query.limit, 10) || 20);

        let query = supabase
            .from('leads')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false });

        if (status   && status   !== 'all') query = query.eq('status',    status);
        if (scamType && scamType !== 'all') query = query.eq('scam_type', scamType);

        query = query.range((page - 1) * limit, page * limit - 1);

        const { data: rows, error: fetchErr, count } = await query;
        if (fetchErr) {
            console.error('Fetch error:', fetchErr);
            return res.status(500).json({ error: 'Failed to fetch leads' });
        }

        let leads = (rows || []).map(mapLead);

        // Client-side search filter
        if (search) {
            const q = search.toLowerCase();
            leads = leads.filter(l =>
                (l.name  || '').toLowerCase().includes(q) ||
                (l.email || '').toLowerCase().includes(q) ||
                (l.phone || '').toLowerCase().includes(q)
            );
        }

        // Stats — lightweight fetch for counts
        const { data: statRows } = await supabase
            .from('leads')
            .select('status, amount');
        const all = statRows || [];
        const stats = {
            total:     all.length,
            new:       all.filter(l => l.status === 'new').length,
            qualified: all.filter(l => l.status === 'qualified').length,
            highValue: all.filter(l => l.amount === '5000+').length,
        };

        return res.status(200).json({ success: true, leads, total: count, page, stats });
    }

    // ── PUT /api/leads/:id ────────────────────────────────────────────────
    if (req.method === 'PUT' && urlId) {
        const body = await parseBody(req);

        if (body.status   && !VALID_STATUSES.includes(body.status))    return res.status(400).json({ error: 'Invalid status' });
        if (body.priority && !VALID_PRIORITIES.includes(body.priority)) return res.status(400).json({ error: 'Invalid priority' });

        const updates = { updated_at: new Date().toISOString() };
        if (body.status   !== undefined) updates.status   = body.status;
        if (body.priority !== undefined) updates.priority = body.priority;
        if (body.notes    !== undefined) updates.notes    = sanitize(body.notes, 2000);

        const { data: row, error } = await supabase
            .from('leads')
            .update(updates)
            .eq('id', urlId)
            .select()
            .single();

        if (error || !row) return res.status(404).json({ error: 'Lead not found' });
        return res.status(200).json({ success: true, lead: mapLead(row) });
    }

    // ── DELETE /api/leads/:id ─────────────────────────────────────────────
    if (req.method === 'DELETE' && urlId) {
        const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', urlId);

        if (error) return res.status(500).json({ error: 'Failed to delete lead' });
        return res.status(200).json({ success: true, message: 'Lead deleted' });
    }

    res.status(405).json({ error: 'Method not allowed' });
};

const DATA_DIR = '/tmp/data';
const LEADS_DB = path.join(DATA_DIR, 'leads.json');
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key-change-this-in-production';

// Rate limiting — public POST submissions (in-memory, per IP)
const submitLog = new Map();
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Strict allowlists for enum fields
const VALID_AMOUNTS    = ['0-250', '250-1000', '1000-5000', '5000+'];
const VALID_SCAMTYPES  = ['crypto', 'broker', 'bank', 'card', 'other'];
const VALID_WHEN       = ['7days', '1-4weeks', '1-3months', '3+months'];
const VALID_PAYMENTS   = ['crypto', 'card', 'bank', 'other'];
const VALID_STATUSES   = ['new', 'contacted', 'qualified', 'in-progress', 'closed', 'rejected'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

function getClientIp(req) {
    return (
        (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
        req.headers['x-real-ip'] ||
        (req.socket && req.socket.remoteAddress) ||
        'unknown'
    );
}

function sanitize(val, maxLen) {
    if (typeof val !== 'string') return '';
    return val.slice(0, maxLen || 300).trim().replace(/[<>]/g, '');
}

function validateEmail(email) {
    return /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,}$/.test(email);
}

function ensureDB() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(LEADS_DB)) fs.writeFileSync(LEADS_DB, '[]');
}

function readLeads() {
    try { return JSON.parse(fs.readFileSync(LEADS_DB, 'utf8')); } catch (e) { return []; }
}

function writeLeads(leads) {
    fs.writeFileSync(LEADS_DB, JSON.stringify(leads, null, 2));
}

function authenticate(req) {
    const auth = req.headers['authorization'];
    if (!auth || !auth.startsWith('Bearer ')) return null;
    try { return jwt.verify(auth.slice(7), SECRET_KEY); } catch (e) { return null; }
}

module.exports = async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    ensureDB();

    // ── POST /api/leads  (public – submit a lead) ──────────────────────────
    if (req.method === 'POST') {
        const ip = getClientIp(req);
        const now = Date.now();
        const log = submitLog.get(ip) || [];
        const recent = log.filter(function(t) { return now - t < WINDOW_MS; });
        if (recent.length >= MAX_SUBMISSIONS) {
            return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
        }

        // Parse body
        let body = req.body;
        if (!body || typeof body !== 'object') {
            const raw = await new Promise(function(resolve, reject) {
                let d = '';
                req.on('data', function(c) { d += c.toString(); });
                req.on('end', function() { resolve(d); });
                req.on('error', reject);
            });
            try { body = JSON.parse(raw); } catch (e) { body = {}; }
        }

        const name     = sanitize(body.name, 100);
        const email    = sanitize(body.email, 254);
        const phone    = sanitize(body.phone, 30);
        const amount   = sanitize(body.amount, 20);
        const scamType = sanitize(body.scamType, 20);
        const when     = sanitize(body.when, 20);
        const payment  = sanitize(body.payment, 20);
        const message  = sanitize(body.message, 2000);

        // Validation
        if (!name || name.length < 2)           return res.status(400).json({ error: 'Valid full name is required' });
        if (!validateEmail(email))              return res.status(400).json({ error: 'Valid email address is required' });
        if (!VALID_AMOUNTS.includes(amount))    return res.status(400).json({ error: 'Invalid amount selection' });
        if (!VALID_SCAMTYPES.includes(scamType)) return res.status(400).json({ error: 'Invalid fraud type selection' });
        if (when && !VALID_WHEN.includes(when)) return res.status(400).json({ error: 'Invalid timeframe selection' });
        if (payment && !VALID_PAYMENTS.includes(payment)) return res.status(400).json({ error: 'Invalid payment selection' });

        const leads = readLeads();
        const newLead = {
            id: leads.length > 0 ? Math.max.apply(null, leads.map(function(l) { return l.id; })) + 1 : 1,
            name, email, phone, amount, scamType,
            when: when || '',
            payment: payment || '',
            message,
            status: 'new',
            priority: amount === '5000+' ? 'high' : amount === '1000-5000' ? 'medium' : 'low',
            notes: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        leads.push(newLead);
        writeLeads(leads);
        recent.push(now);
        submitLog.set(ip, recent);

        return res.status(201).json({ success: true, message: 'Lead submitted successfully', leadId: newLead.id });
    }

    // ── All other methods require admin authentication ──────────────────────
    const user = authenticate(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    if (user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

    const leads = readLeads();
    const urlId = req.query && req.query.id ? parseInt(req.query.id, 10) : null;

    // ── GET /api/leads ──────────────────────────────────────────────────────
    if (req.method === 'GET') {
        // CSV export
        if (req.url && req.url.includes('/export/csv')) {
            const csv = [
                'ID,Name,Email,Phone,Amount,Scam Type,When,Payment,Status,Priority,Message,Created',
                ...leads.map(function(l) {
                    return [l.id, l.name, l.email, l.phone, l.amount, l.scamType, l.when, l.payment, l.status, l.priority,
                        (l.message || '').replace(/"/g, '""'), l.createdAt
                    ].map(function(v) { return '"' + (v || '') + '"'; }).join(',');
                })
            ].join('\n');
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
            return res.status(200).send(csv);
        }

        if (urlId) {
            const lead = leads.find(function(l) { return l.id === urlId; });
            if (!lead) return res.status(404).json({ error: 'Lead not found' });
            return res.status(200).json({ success: true, lead });
        }

        const status   = req.query.status;
        const scamType = req.query.scamType;
        const search   = req.query.search;
        const page     = parseInt(req.query.page, 10) || 1;
        const limit    = Math.min(100, parseInt(req.query.limit, 10) || 20);

        let filtered = leads.slice();
        if (status && status !== 'all') filtered = filtered.filter(function(l) { return l.status === status; });
        if (scamType && scamType !== 'all') filtered = filtered.filter(function(l) { return l.scamType === scamType; });
        if (search) {
            const q = search.toLowerCase();
            filtered = filtered.filter(function(l) {
                return (l.name || '').toLowerCase().includes(q) ||
                       (l.email || '').toLowerCase().includes(q) ||
                       (l.phone || '').toLowerCase().includes(q);
            });
        }
        filtered.sort(function(a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });

        const total     = filtered.length;
        const paginated = filtered.slice((page - 1) * limit, page * limit);
        const stats = {
            total: leads.length,
            new: leads.filter(function(l) { return l.status === 'new'; }).length,
            qualified: leads.filter(function(l) { return l.status === 'qualified'; }).length,
            highValue: leads.filter(function(l) { return l.amount === '5000+'; }).length
        };

        return res.status(200).json({ success: true, leads: paginated, total, page, stats });
    }

    // ── PUT /api/leads/:id ──────────────────────────────────────────────────
    if (req.method === 'PUT' && urlId) {
        let body = req.body;
        if (!body || typeof body !== 'object') {
            const raw = await new Promise(function(resolve, reject) {
                let d = '';
                req.on('data', function(c) { d += c.toString(); });
                req.on('end', function() { resolve(d); });
                req.on('error', reject);
            });
            try { body = JSON.parse(raw); } catch (e) { body = {}; }
        }

        const idx = leads.findIndex(function(l) { return l.id === urlId; });
        if (idx === -1) return res.status(404).json({ error: 'Lead not found' });

        if (body.status   && !VALID_STATUSES.includes(body.status))   return res.status(400).json({ error: 'Invalid status' });
        if (body.priority && !VALID_PRIORITIES.includes(body.priority)) return res.status(400).json({ error: 'Invalid priority' });

        if (body.status   !== undefined) leads[idx].status   = body.status;
        if (body.priority !== undefined) leads[idx].priority = body.priority;
        if (body.notes    !== undefined) leads[idx].notes    = sanitize(body.notes, 2000);
        leads[idx].updatedAt = new Date().toISOString();

        writeLeads(leads);
        return res.status(200).json({ success: true, lead: leads[idx] });
    }

    // ── DELETE /api/leads/:id ───────────────────────────────────────────────
    if (req.method === 'DELETE' && urlId) {
        const idx = leads.findIndex(function(l) { return l.id === urlId; });
        if (idx === -1) return res.status(404).json({ error: 'Lead not found' });
        leads.splice(idx, 1);
        writeLeads(leads);
        return res.status(200).json({ success: true, message: 'Lead deleted' });
    }

    res.status(405).json({ error: 'Method not allowed' });
};
