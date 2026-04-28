const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key-change-this-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Database files
const LEADS_DB = path.join(__dirname, 'data', 'leads.json');
const USERS_DB = path.join(__dirname, 'data', 'users.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

// Initialize databases if they don't exist
if (!fs.existsSync(LEADS_DB)) {
    fs.writeFileSync(LEADS_DB, JSON.stringify([]));
}

if (!fs.existsSync(USERS_DB)) {
    // Default admin user — change password on first login
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

// Helper functions
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

const readUsers = () => {
    try {
        const data = fs.readFileSync(USERS_DB, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token.' });
        }
        req.user = user;
        next();
    });
};

// ==================== AUTH ROUTES ====================

// Login
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

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

    res.json({
        success: true,
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
});

// Verify token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
    res.json({ success: true, user: req.user });
});

// ==================== LEAD ROUTES ====================

// Submit new lead (public endpoint - from contact form)
app.post('/api/leads', (req, res) => {
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
});

// Get all leads (protected)
app.get('/api/leads', authenticateToken, (req, res) => {
    try {
        const leads = readLeads();
        const { status, fraudType, amount, search, sortBy, order } = req.query;

        let filteredLeads = [...leads];

        // Apply filters
        if (status) {
            filteredLeads = filteredLeads.filter(lead => lead.status === status);
        }
        if (fraudType) {
            filteredLeads = filteredLeads.filter(lead => lead.scamType === fraudType);
        }
        if (amount) {
            filteredLeads = filteredLeads.filter(lead => lead.amount === amount);
        }
        if (search) {
            const searchLower = search.toLowerCase();
            filteredLeads = filteredLeads.filter(lead =>
                lead.name.toLowerCase().includes(searchLower) ||
                lead.email.toLowerCase().includes(searchLower) ||
                (lead.phone && lead.phone.includes(searchLower))
            );
        }

        // Sort
        if (sortBy) {
            filteredLeads.sort((a, b) => {
                let comparison = 0;
                if (sortBy === 'date') {
                    comparison = new Date(b.createdAt) - new Date(a.createdAt);
                } else if (sortBy === 'name') {
                    comparison = a.name.localeCompare(b.name);
                }
                return order === 'asc' ? -comparison : comparison;
            });
        } else {
            // Default sort by date (newest first)
            filteredLeads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        res.json({
            success: true,
            leads: filteredLeads,
            total: filteredLeads.length
        });
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ error: 'Failed to fetch leads' });
    }
});

// Get single lead (protected)
app.get('/api/leads/:id', authenticateToken, (req, res) => {
    try {
        const leads = readLeads();
        const lead = leads.find(l => l.id === parseInt(req.params.id));

        if (!lead) {
            return res.status(404).json({ error: 'Lead not found' });
        }

        res.json({ success: true, lead });
    } catch (error) {
        console.error('Error fetching lead:', error);
        res.status(500).json({ error: 'Failed to fetch lead' });
    }
});

// Update lead (protected)
app.put('/api/leads/:id', authenticateToken, (req, res) => {
    try {
        const leads = readLeads();
        const leadIndex = leads.findIndex(l => l.id === parseInt(req.params.id));

        if (leadIndex === -1) {
            return res.status(404).json({ error: 'Lead not found' });
        }

        const updatedLead = {
            ...leads[leadIndex],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        leads[leadIndex] = updatedLead;
        writeLeads(leads);

        res.json({ success: true, lead: updatedLead });
    } catch (error) {
        console.error('Error updating lead:', error);
        res.status(500).json({ error: 'Failed to update lead' });
    }
});

// Delete lead (protected)
app.delete('/api/leads/:id', authenticateToken, (req, res) => {
    try {
        const leads = readLeads();
        const filteredLeads = leads.filter(l => l.id !== parseInt(req.params.id));

        if (leads.length === filteredLeads.length) {
            return res.status(404).json({ error: 'Lead not found' });
        }

        writeLeads(filteredLeads);
        res.json({ success: true, message: 'Lead deleted successfully' });
    } catch (error) {
        console.error('Error deleting lead:', error);
        res.status(500).json({ error: 'Failed to delete lead' });
    }
});

// Get statistics (protected)
app.get('/api/stats', authenticateToken, (req, res) => {
    try {
        const leads = readLeads();
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const stats = {
            total: leads.length,
            new: leads.filter(l => l.status === 'new').length,
            contacted: leads.filter(l => l.status === 'contacted').length,
            qualified: leads.filter(l => l.status === 'qualified').length,
            unqualified: leads.filter(l => l.status === 'unqualified').length,
            last7Days: leads.filter(l => new Date(l.createdAt) >= sevenDaysAgo).length,
            highValue: leads.filter(l => l.amount === '5000+').length,
            byFraudType: {
                crypto: leads.filter(l => l.scamType === 'crypto').length,
                broker: leads.filter(l => l.scamType === 'broker').length,
                bank: leads.filter(l => l.scamType === 'bank').length,
                card: leads.filter(l => l.scamType === 'card').length,
                other: leads.filter(l => l.scamType === 'other').length
            }
        };

        res.json({ success: true, stats });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

// Export leads to CSV (protected)
app.get('/api/leads/export/csv', authenticateToken, (req, res) => {
    try {
        const leads = readLeads();
        
        // CSV header
        let csv = 'ID,Date,Name,Email,Phone,Amount,Fraud Type,When,Payment Method,Status,Message\n';
        
        // CSV rows
        leads.forEach(lead => {
            csv += `${lead.id},`;
            csv += `"${new Date(lead.createdAt).toLocaleString()}",`;
            csv += `"${lead.name}",`;
            csv += `"${lead.email}",`;
            csv += `"${lead.phone || ''}",`;
            csv += `"${lead.amount}",`;
            csv += `"${lead.scamType}",`;
            csv += `"${lead.when || ''}",`;
            csv += `"${lead.payment || ''}",`;
            csv += `"${lead.status}",`;
            csv += `"${(lead.message || '').replace(/"/g, '""')}"\n`;
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=leads-export.csv');
        res.send(csv);
    } catch (error) {
        console.error('Error exporting leads:', error);
        res.status(500).json({ error: 'Failed to export leads' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🚀 ReclaimGuard Admin Server Running                ║
║                                                        ║
║   Port: ${PORT}                                          ║
║   URL: http://localhost:${PORT}                         ║
║                                                        ║
║   Admin Credentials:                                  ║
║   Username: ioannis1                                  ║
║   Password: Ioannis1@                                 ║
║                                                        ║
║   ⚠️  CHANGE DEFAULT PASSWORD IN PRODUCTION!          ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
    `);
});
