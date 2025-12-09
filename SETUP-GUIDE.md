# ReclaimGuard Legal - Admin System Setup Guide

## 🚀 Quick Start

This guide will help you set up and run the complete ReclaimGuard Legal admin system with backend API and lead management dashboard.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Edge, Safari)

---

## 🔧 Installation Steps

### 1. Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- `express` - Web server framework
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cors` - Cross-origin resource sharing
- `body-parser` - Request body parsing
- `dotenv` - Environment variable management

### 2. Configure Environment Variables

The `.env` file contains your configuration. **IMPORTANT**: Change the default values before deployment!

```env
PORT=3000
SECRET_KEY=ReclaimGuard-Secret-Key-Change-This-In-Production-Use-Random-String
```

**Security Note**: Generate a strong random SECRET_KEY for production:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Start the Server

Run the development server:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

You should see:
```
✅ Server running on port 3000
✅ Admin system initialized
✅ Default admin user created
```

---

## 🌐 Accessing the System

### Main Website
- Open your browser and navigate to: `http://localhost:3000`
- Or open `index.html` directly in your browser

### Admin Dashboard
- Navigate to: `http://localhost:3000/admin.html`
- Or open `admin.html` directly in your browser

**Default Admin Credentials**:
- Username: `admin`
- Password: `admin123`

⚠️ **IMPORTANT**: Change the default admin password immediately after first login!

---

## 📊 Admin Dashboard Features

### Lead Management
- View all leads in real-time
- Filter by status: New, In Progress, Won, Lost
- Search by name, email, or phone
- Sort by submission date
- View detailed lead information
- Update lead status
- Export leads to CSV

### Authentication
- Secure JWT-based authentication
- 24-hour session tokens
- Auto-refresh every 30 seconds
- Automatic logout on token expiration

### Statistics Dashboard
- Total leads count
- New leads (last 7 days)
- Won cases count
- Conversion rate tracking

---

## 🔌 API Endpoints

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response: {
  "token": "jwt_token_here"
}
```

#### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer {token}

Response: {
  "valid": true,
  "user": {...}
}
```

### Lead Management

#### Get All Leads
```http
GET /api/leads?status=new&search=keyword
Authorization: Bearer {token}

Response: [
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "fraudType": "Crypto Scam",
    "amountRange": "$10,000 - $50,000",
    "timeframe": "0-3 months",
    "description": "...",
    "status": "new",
    "submittedAt": "2024-01-01T10:00:00.000Z"
  }
]
```

#### Create Lead (Public - No Auth Required)
```http
POST /api/leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "fraudType": "Crypto Scam",
  "amountRange": "$10,000 - $50,000",
  "timeframe": "0-3 months",
  "description": "..."
}
```

#### Get Single Lead
```http
GET /api/leads/:id
Authorization: Bearer {token}
```

#### Update Lead Status
```http
PUT /api/leads/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "in-progress"
}
```

#### Delete Lead
```http
DELETE /api/leads/:id
Authorization: Bearer {token}
```

#### Get Statistics
```http
GET /api/stats
Authorization: Bearer {token}

Response: {
  "totalLeads": 45,
  "newLeads": 12,
  "wonCases": 8,
  "conversionRate": 17.78
}
```

#### Export to CSV
```http
GET /api/leads/export/csv
Authorization: Bearer {token}

Response: CSV file download
```

---

## 📁 Project Structure

```
crypto-recovery-law/
├── assets/
│   └── images/
│       ├── team-hero.jpg          # Hero background image
│       └── reclaim-guard-logo.png # Company logo
├── data/                          # Auto-created on first run
│   ├── leads.json                 # Lead database
│   └── users.json                 # User database
├── index.html                     # Main website
├── admin.html                     # Admin dashboard
├── privacy.html                   # Privacy policy page
├── terms.html                     # Terms & conditions page
├── script.js                      # Frontend JavaScript
├── styles.css                     # Website styling
├── server.js                      # Backend API server
├── package.json                   # Node.js dependencies
├── .env                           # Environment variables
├── .gitignore                     # Git ignore rules
└── SETUP-GUIDE.md                 # This file
```

---

## 🔐 Security Best Practices

### Before Deployment

1. **Change Default Credentials**
   - Update admin password immediately
   - Use strong, unique passwords

2. **Update SECRET_KEY**
   - Generate a cryptographically secure random key
   - Never commit `.env` to version control

3. **Enable HTTPS**
   - Use SSL/TLS certificates in production
   - Configure secure cookies

4. **Implement Rate Limiting**
   - Prevent brute force attacks
   - Use `express-rate-limit` package

5. **Environment Variables**
   - Store all sensitive data in `.env`
   - Use different keys for development/production

### Recommended Additions

```bash
npm install express-rate-limit helmet
```

Add to `server.js`:
```javascript
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

app.use(helmet());

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 attempts
});

app.post('/api/auth/login', loginLimiter, ...);
```

---

## 🚀 Deployment

### Option 1: Deploy to Heroku

1. Create a Heroku account
2. Install Heroku CLI
3. Run:
```bash
heroku create your-app-name
heroku config:set SECRET_KEY=your-random-key
git push heroku main
```

### Option 2: Deploy to VPS (DigitalOcean, AWS, etc.)

1. Install Node.js on server
2. Install PM2 for process management:
```bash
npm install -g pm2
```

3. Start the application:
```bash
pm2 start server.js --name reclaim-guard
pm2 save
pm2 startup
```

4. Configure Nginx as reverse proxy
5. Set up SSL with Let's Encrypt

### Option 3: Deploy Frontend to Vercel/Netlify

1. Deploy static files (HTML, CSS, JS) to Vercel or Netlify
2. Deploy backend to separate hosting (Heroku, Railway, Render)
3. Update API endpoints in `script.js` and `admin.html`

---

## 🛠️ Troubleshooting

### Server won't start
- Check if port 3000 is already in use
- Verify Node.js is installed: `node --version`
- Ensure all dependencies are installed: `npm install`

### Can't login to admin dashboard
- Verify server is running on port 3000
- Check browser console for errors
- Clear browser cache and cookies
- Ensure default admin user was created (check server logs)

### Leads not appearing
- Check if `data/` folder exists
- Verify `leads.json` file is created
- Check browser console for API errors
- Ensure CORS is enabled in server.js

### CSV export not working
- Verify you're logged in with valid token
- Check browser allows file downloads
- Ensure leads exist in database

---

## 📞 Support

For issues or questions:
- Check server logs in terminal
- Review browser console for errors
- Verify all files are in correct locations
- Ensure environment variables are set

---

## 📝 License

This project is for ReclaimGuard Legal internal use.

---

## 🎯 Next Steps

1. **Change Default Credentials**: Update admin password
2. **Configure .env**: Set strong SECRET_KEY
3. **Test System**: Submit test lead from contact form
4. **Customize Content**: Update website copy, images, pricing
5. **Add Team Members**: Create additional admin users
6. **Set Up Monitoring**: Implement logging and error tracking
7. **Configure Backup**: Regular backup of `data/` folder
8. **Deploy to Production**: Follow deployment guide above

---

## ✅ Quick Verification Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] Server starts successfully (`npm start`)
- [ ] Admin dashboard loads (http://localhost:3000/admin.html)
- [ ] Can login with admin/admin123
- [ ] Contact form submits successfully
- [ ] Leads appear in admin dashboard
- [ ] CSV export works
- [ ] Default password changed
- [ ] SECRET_KEY updated in .env

---

**Ready to deploy?** Follow the security best practices and deployment guide above!

**Need help?** Review the troubleshooting section or check server logs for detailed error messages.
