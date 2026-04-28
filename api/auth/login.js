// In-memory brute-force store (per IP, resets on cold start)
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FIELD_LEN = 200;

function getClientIp(req) {
    return (
        (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
        req.headers['x-real-ip'] ||
        (req.socket && req.socket.remoteAddress) ||
        'unknown'
    );
}

function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str.slice(0, MAX_FIELD_LEN).trim();
}

module.exports = async (req, res) => {
    // Security & CORS headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const ip = getClientIp(req);

    // Brute-force check
    const record = loginAttempts.get(ip) || { attempts: 0, lockedUntil: 0 };
    if (record.lockedUntil > Date.now()) {
        const remaining = Math.ceil((record.lockedUntil - Date.now()) / 60000);
        res.status(429).json({ error: 'Too many failed attempts. Try again in ' + remaining + ' minute(s).' });
        return;
    }

    try {
        const bcrypt = require('bcryptjs');
        const jwt = require('jsonwebtoken');
        const fs = require('fs');
        const path = require('path');

        const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key-change-this-in-production';

        const DATA_DIR = '/tmp/data';
        const USERS_DB = path.join(DATA_DIR, 'users.json');

        if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

        if (!fs.existsSync(USERS_DB)) {
            const hashedPassword = bcrypt.hashSync('Ioannis1@', 10);
            fs.writeFileSync(USERS_DB, JSON.stringify([{
                id: 1,
                username: 'ioannis1',
                email: 'admin@reclaimguard.legal',
                password: hashedPassword,
                role: 'admin',
                createdAt: new Date().toISOString()
            }], null, 2));
        }

        // Parse body — handle both pre-parsed (req.body) and raw stream
        let body = req.body;
        if (!body || typeof body !== 'object') {
            const raw = await new Promise((resolve, reject) => {
                let data = '';
                req.on('data', chunk => { data += chunk.toString(); });
                req.on('end', () => resolve(data));
                req.on('error', reject);
            });
            try { body = JSON.parse(raw); } catch (e) { body = {}; }
        }

        const username = sanitize(body.username);
        const password = sanitize(body.password);

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        if (username.length < 3 || password.length < 6) {
            return res.status(400).json({ error: 'Invalid credentials format' });
        }

        let users = [];
        try { users = JSON.parse(fs.readFileSync(USERS_DB, 'utf8')); } catch (e) { users = []; }

        const user = users.find(u => u.username === username);

        // Always run bcrypt to prevent timing attacks
        const DUMMY_HASH = '$2a$10$invaliddummyhashfortimingx00000000000000000000000000000';
        const validPassword = user ? bcrypt.compareSync(password, user.password) : (bcrypt.compareSync(password, DUMMY_HASH), false);

        if (!user || !validPassword) {
            record.attempts = (record.attempts || 0) + 1;
            if (record.attempts >= MAX_ATTEMPTS) {
                record.lockedUntil = Date.now() + LOCKOUT_MS;
                record.attempts = 0;
            }
            loginAttempts.set(ip, record);
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Success — clear brute-force counter
        loginAttempts.delete(ip);

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            SECRET_KEY,
            { expiresIn: '8h' }
        );

        res.status(200).json({
            success: true,
            token,
            user: { id: user.id, username: user.username, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
