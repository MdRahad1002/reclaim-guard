// Admin login. Credentials come from environment variables only:
//   ADMIN_USERNAME       - the admin username
//   ADMIN_PASSWORD_HASH  - a bcrypt hash of the password (never plaintext)
//   SECRET_KEY           - JWT signing secret
// There is no hardcoded fallback: if these are unset, login is disabled.

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory brute-force store (per IP, resets on restart)
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FIELD_LEN = 200;

// A valid bcrypt hash used for constant-time comparison when the user is
// unknown, so response timing doesn't reveal whether the username exists.
const DUMMY_HASH = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

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
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') { res.status(200).end(); return; }
    if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

    const SECRET_KEY      = process.env.SECRET_KEY;
    const ADMIN_USERNAME  = process.env.ADMIN_USERNAME;
    const ADMIN_PASS_HASH = process.env.ADMIN_PASSWORD_HASH;

    // Fail closed: no configuration -> no login.
    if (!SECRET_KEY || !ADMIN_USERNAME || !ADMIN_PASS_HASH) {
        console.error('Admin login not configured (SECRET_KEY / ADMIN_USERNAME / ADMIN_PASSWORD_HASH).');
        return res.status(503).json({ error: 'Admin login is not configured.' });
    }

    const ip = getClientIp(req);
    const record = loginAttempts.get(ip) || { attempts: 0, lockedUntil: 0 };
    if (record.lockedUntil > Date.now()) {
        const remaining = Math.ceil((record.lockedUntil - Date.now()) / 60000);
        return res.status(429).json({ error: 'Too many failed attempts. Try again in ' + remaining + ' minute(s).' });
    }

    // Parse body (pre-parsed object or raw stream)
    let body = req.body;
    if (!body || typeof body !== 'object') {
        const raw = await new Promise((resolve, reject) => {
            let d = '';
            req.on('data', c => { d += c.toString(); });
            req.on('end', () => resolve(d));
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

    // Always run bcrypt (constant time regardless of username match).
    const usernameMatches = username === ADMIN_USERNAME;
    const validPassword = bcrypt.compareSync(password, usernameMatches ? ADMIN_PASS_HASH : DUMMY_HASH);

    if (!usernameMatches || !validPassword) {
        record.attempts = (record.attempts || 0) + 1;
        if (record.attempts >= MAX_ATTEMPTS) {
            record.lockedUntil = Date.now() + LOCKOUT_MS;
            record.attempts = 0;
        }
        loginAttempts.set(ip, record);
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Success
    loginAttempts.delete(ip);
    const token = jwt.sign(
        { id: 1, username: ADMIN_USERNAME, role: 'admin' },
        SECRET_KEY,
        { expiresIn: '8h' }
    );

    res.status(200).json({
        success: true,
        token,
        user: { id: 1, username: ADMIN_USERNAME, role: 'admin' }
    });
};
