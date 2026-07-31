const jwt  = require('jsonwebtoken');
const { Pool } = require('pg');
const { sendLeadConfirmation, sendAdminNotification } = require('../mailer');

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key-change-this-in-production';

// Rate limiting public POST submissions (in-memory, per IP)
const submitLog = new Map();
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Strict allowlists for enum fields
const VALID_AMOUNTS    = ['under-1000', '1000-5000', '5000-25000', '25000-100000', '100000+'];
const VALID_SCAMTYPES  = ['crypto', 'broker', 'bank', 'card', 'other'];
const VALID_WHEN       = ['7days', '1-4weeks', '1-3months', '3-6months', '6-12months', '1+year'];
const VALID_PAYMENTS   = ['crypto', 'card', 'bank', 'other'];
const VALID_STATUSES   = ['new', 'contacted', 'no-answer', 'callback', 'wrong-number', 'qualified', 'in-progress', 'not-interested', 'closed', 'rejected'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

// Reuse pool across warm invocations
let _pool;
function getPool() {
    if (!_pool) {
        // Parse the URL into individual params so our ssl config
        // isn't overridden by sslmode= query params in the connection string
        const url = new URL(process.env.POSTGRES_URL);
        _pool = new Pool({
            host:     url.hostname,
            port:     parseInt(url.port) || 5432,
            database: url.pathname.replace(/^\//, ''),
            user:     decodeURIComponent(url.username),
            password: decodeURIComponent(url.password),
            ssl:      { rejectUnauthorized: false },
            max: 1,
        });
    }
    return _pool;
}

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

function mapLead(row) {
    return {
        id:        parseInt(row.id, 10),
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

async function ensureTable(db) {
    await db.query(`
        CREATE TABLE IF NOT EXISTS leads (
            id            BIGSERIAL PRIMARY KEY,
            name          TEXT,
            email         TEXT,
            phone         TEXT,
            amount        TEXT,
            scam_type     TEXT,
            when_reported TEXT,
            payment       TEXT,
            message       TEXT,
            status        TEXT DEFAULT 'new',
            priority      TEXT DEFAULT 'normal',
            notes         TEXT DEFAULT '',
            ip            TEXT,
            created_at    TIMESTAMPTZ DEFAULT NOW(),
            updated_at    TIMESTAMPTZ DEFAULT NOW()
        )
    `);
}

module.exports = async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    if (!process.env.POSTGRES_URL) {
        return res.status(500).json({ error: 'Database not configured. POSTGRES_URL env var is missing.' });
    }

    const db = getPool();

    try { await ensureTable(db); } catch (e) {
        console.error('ensureTable error:', e.message);
        return res.status(500).json({ error: 'Database setup failed: ' + e.message });
    }

    // ── POST /api/leads  (public) ─────────────────────────────────────────
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

        const priority = (amount === '100000+' || amount === '25000-100000') ? 'high' : (amount === '5000-25000' || amount === '1000-5000') ? 'medium' : 'low';

        try {
            const { rows } = await db.query(
                `INSERT INTO leads
                    (name, email, phone, amount, scam_type, when_reported, payment, message, priority, status, notes, ip)
                 VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'new','',$10)
                 RETURNING id`,
                [name, email, phone, amount, scamType, when || null, payment || null, message, priority, ip]
            );
            recent.push(now);
            submitLog.set(ip, recent);

            const leadId = rows[0].id;

            // Fire-and-forget emails do not block the HTTP response
            sendLeadConfirmation({ name, email, amount, scamType }).catch(err =>
                console.error('Confirmation email failed:', err.message)
            );
            sendAdminNotification({ name, email, phone, amount, scamType, when, payment, message, leadId, priority }).catch(err =>
                console.error('Admin notification email failed:', err.message)
            );

            return res.status(201).json({ success: true, message: 'Lead submitted successfully', leadId });
        } catch (e) {
            console.error('Insert error:', e.message);
            return res.status(500).json({ error: 'Failed to save lead. Please try again.' });
        }
    }

    // ── All other methods require admin auth ──────────────────────────────
    const user = authenticate(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    if (user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

    const urlId = req.query && req.query.id ? parseInt(req.query.id, 10) : null;

    // ── GET /api/leads ────────────────────────────────────────────────────
    if (req.method === 'GET') {

        // CSV export
        if (req.url && req.url.includes('/export/csv')) {
            const { rows } = await db.query('SELECT * FROM leads ORDER BY created_at DESC');
            const leads = rows.map(mapLead);
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

        // Single lead
        if (urlId) {
            const { rows } = await db.query('SELECT * FROM leads WHERE id = $1', [urlId]);
            if (!rows[0]) return res.status(404).json({ error: 'Lead not found' });
            return res.status(200).json({ success: true, lead: mapLead(rows[0]) });
        }

        // List leads
        const status   = req.query.status;
        const scamType = req.query.scamType;
        const search   = req.query.search;
        const page     = parseInt(req.query.page, 10) || 1;
        const limit    = Math.min(500, parseInt(req.query.limit, 10) || 20);
        const offset   = (page - 1) * limit;

        const conditions = [];
        const params     = [];

        if (status   && status   !== 'all') { params.push(status);   conditions.push(`status = $${params.length}`); }
        if (scamType && scamType !== 'all') { params.push(scamType); conditions.push(`scam_type = $${params.length}`); }

        const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
        params.push(limit);  const limitPh  = params.length;
        params.push(offset); const offsetPh = params.length;

        const { rows } = await db.query(
            `SELECT * FROM leads ${where} ORDER BY created_at DESC LIMIT $${limitPh} OFFSET $${offsetPh}`,
            params
        );
        const { rows: totRow } = await db.query(
            `SELECT COUNT(*)::int AS c FROM leads ${where}`,
            params.slice(0, conditions.length)
        );

        let leads = rows.map(mapLead);
        if (search) {
            const q = search.toLowerCase();
            leads = leads.filter(l =>
                (l.name  || '').toLowerCase().includes(q) ||
                (l.email || '').toLowerCase().includes(q) ||
                (l.phone || '').toLowerCase().includes(q)
            );
        }

        const { rows: statRows } = await db.query('SELECT status, amount FROM leads');
        const stats = {
            total:     statRows.length,
            new:       statRows.filter(l => l.status === 'new').length,
            qualified: statRows.filter(l => l.status === 'qualified').length,
            highValue: statRows.filter(l => ['5000-25000', '25000-100000', '100000+'].includes(l.amount)).length,
        };

        return res.status(200).json({ success: true, leads, total: totRow[0]?.c || 0, page, stats });
    }

    // ── PUT /api/leads/:id ────────────────────────────────────────────────
    if (req.method === 'PUT' && urlId) {
        const body = await parseBody(req);

        if (body.status   && !VALID_STATUSES.includes(body.status))    return res.status(400).json({ error: 'Invalid status' });
        if (body.priority && !VALID_PRIORITIES.includes(body.priority)) return res.status(400).json({ error: 'Invalid priority' });

        const setClauses = ['updated_at = NOW()'];
        const params     = [];

        if (body.status   !== undefined) { params.push(body.status);                setClauses.push(`status = $${params.length}`); }
        if (body.priority !== undefined) { params.push(body.priority);              setClauses.push(`priority = $${params.length}`); }
        if (body.notes    !== undefined) { params.push(sanitize(body.notes, 2000)); setClauses.push(`notes = $${params.length}`); }

        params.push(urlId);
        const { rows } = await db.query(
            `UPDATE leads SET ${setClauses.join(', ')} WHERE id = $${params.length} RETURNING *`,
            params
        );
        if (!rows[0]) return res.status(404).json({ error: 'Lead not found' });
        return res.status(200).json({ success: true, lead: mapLead(rows[0]) });
    }

    // ── DELETE /api/leads/:id ─────────────────────────────────────────────
    if (req.method === 'DELETE' && urlId) {
        try {
            await db.query('DELETE FROM leads WHERE id = $1', [urlId]);
            return res.status(200).json({ success: true, message: 'Lead deleted' });
        } catch (e) {
            return res.status(500).json({ error: 'Failed to delete lead' });
        }
    }

    res.status(405).json({ error: 'Method not allowed' });
};
