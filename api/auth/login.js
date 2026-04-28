module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const bcrypt = require('bcryptjs');
        const jwt = require('jsonwebtoken');
        const fs = require('fs');
        const path = require('path');

        const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key-change-this-in-production';

        // Use /tmp for serverless environment
        const DATA_DIR = '/tmp/data';
        const USERS_DB = path.join(DATA_DIR, 'users.json');

        // Ensure data directory exists
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }

        // Initialize users database if it doesn't exist
        if (!fs.existsSync(USERS_DB)) {
            const hashedPassword = bcrypt.hashSync('Ioannis1@', 10);
            const defaultUser = [{
                id: 1,
                username: 'ioannis1',
                email: 'admin@reclaimguard.legal',
                password: hashedPassword,
                role: 'admin',
                createdAt: new Date().toISOString()
            }];
            fs.writeFileSync(USERS_DB, JSON.stringify(defaultUser, null, 2));
        }

        const readUsers = () => {
            try {
                const data = fs.readFileSync(USERS_DB, 'utf8');
                return JSON.parse(data);
            } catch (error) {
                return [];
            }
        };

        // Parse body — handle both pre-parsed (req.body) and raw stream
        let body = req.body;
        if (!body || typeof body !== 'object') {
            const raw = await new Promise((resolve, reject) => {
                let data = '';
                req.on('data', chunk => { data += chunk; });
                req.on('end', () => resolve(data));
                req.on('error', reject);
            });
            try { body = JSON.parse(raw); } catch { body = {}; }
        }

        const { username, password } = body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const users = readUsers();
        const user = users.find(u => u.username === username);

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
