const fs = require('fs');
const path = require('path');

// Use /tmp for serverless environment
const DATA_DIR = '/tmp/data';
const LEADS_DB = path.join(DATA_DIR, 'leads.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize leads database if it doesn't exist
if (!fs.existsSync(LEADS_DB)) {
    fs.writeFileSync(LEADS_DB, JSON.stringify([]));
}

const readLeads = () => {
    try {
        const data = fs.readFileSync(LEADS_DB, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeLeads = (leads) => {
    fs.writeFileSync(LEADS_DB, JSON.stringify(leads, null, 2));
};

module.exports = (req, res) => {
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
        const { name, email, phone, amount, scamType, when, payment, message } = req.body;

        if (!name || !email || !amount || !scamType) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const leads = readLeads();
        const newLead = {
            id: leads.length > 0 ? Math.max(...leads.map(l => l.id)) + 1 : 1,
            name,
            email,
            phone: phone || '',
            amount,
            scamType,
            when: when || '',
            payment: payment || '',
            message: message || '',
            status: 'new',
            priority: amount === '5000+' ? 'high' : amount === '1000-5000' ? 'medium' : 'low',
            notes: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        leads.push(newLead);
        writeLeads(leads);

        res.status(201).json({
            success: true,
            message: 'Lead submitted successfully',
            leadId: newLead.id
        });
    } catch (error) {
        console.error('Error creating lead:', error);
        res.status(500).json({ error: 'Failed to submit lead' });
    }
};
