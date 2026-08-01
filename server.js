/**
 * ReclaimGuard Legal production server (VPS / self-hosted).
 *
 * Runs behind Caddy, which terminates TLS and reverse-proxies to PORT on
 * 127.0.0.1. Reuses the same api/* handlers that ran as Vercel functions,
 * so lead storage (Neon Postgres), email, validation and rate limiting
 * behave identically.
 *
 * Static files are served from an explicit allowlist. Never use
 * express.static(__dirname) here: it would expose .env, api/, data/ and
 * the rest of the source tree.
 */
const express = require('express');
const path    = require('path');
const fs      = require('fs');
require('dotenv').config();

const app  = express();
const PORT = parseInt(process.env.PORT, 10) || 3002;
const HOST = process.env.HOST || '127.0.0.1'; // localhost only; Caddy fronts it

app.disable('x-powered-by');
// Caddy sets X-Forwarded-For; needed so rate limiting sees the real client IP.
app.set('trust proxy', 1);

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// ---------------------------------------------------------------------------
// Security headers (mirrors the previous vercel.json "headers" config)
// ---------------------------------------------------------------------------
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=()');
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    if (req.path === '/admin' || req.path === '/admin.html') {
        res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    }
    next();
});

// ---------------------------------------------------------------------------
// API routes  (the same handlers Vercel executed as serverless functions)
// ---------------------------------------------------------------------------
const leadsHandler = require('./api/leads/index.js');

// Injects :id into req.query, which the leads handler reads.
// req.query is a getter in Express 4, so it must be redefined, not assigned.
function withQueryId(handler) {
    return (req, res) => {
        const q = Object.assign({}, req.query, { id: req.params.id });
        Object.defineProperty(req, 'query', { value: q, writable: true, configurable: true });
        return handler(req, res);
    };
}

app.get('/api/geo',          require('./api/geo.js'));
app.post('/api/auth/login',  require('./api/auth/login.js'));
app.all('/api/auth/verify',  require('./api/auth/verify.js'));

// Must precede /api/leads/:id so "export" isn't parsed as an id.
app.get('/api/leads/export/csv', leadsHandler);
app.all('/api/leads',            leadsHandler);
app.all('/api/leads/:id',        withQueryId(leadsHandler));

// ---------------------------------------------------------------------------
// Static assets (explicit allowlist)
// ---------------------------------------------------------------------------
const ASSETS_DIR  = path.join(__dirname, 'assets');
const BLOG_DIR    = path.join(__dirname, 'blog');
const RECOVER_DIR = path.join(__dirname, 'recover');

app.use('/assets', express.static(ASSETS_DIR, { maxAge: '30d', dotfiles: 'deny' }));

// Root-level files that are safe to publish.
const ROOT_FILES = new Set([
    'styles.css', 'script.js', 'analytics.js', 'i18n.js',
    'sitemap.xml', 'robots.txt', 'llms.txt',
]);

for (const file of ROOT_FILES) {
    app.get('/' + file, (req, res) => res.sendFile(path.join(__dirname, file)));
}

// Clean URL -> HTML page. Mirrors the previous vercel.json "routes".
const PAGES = {
    '/':            'index.html',
    '/thank-you':   'thank-you.html',
    '/privacy':     'privacy.html',
    '/terms':       'terms.html',
    '/admin':       'admin.html',
    '/blog':        'blog.html',
};

for (const [route, file] of Object.entries(PAGES)) {
    const send = (req, res) => res.sendFile(path.join(__dirname, file));
    app.get(route, send);
    if (route !== '/') app.get(route + '.html', send); // keep .html URLs working
}

// Blog posts: /blog/<slug> and /blog/de/<slug>, with or without .html.
// Resolved inside BLOG_DIR and verified, so "../" traversal can't escape.
app.get(/^\/blog\/(.+)$/, (req, res, next) => {
    let slug = req.params[0].replace(/\.html$/, '');
    if (!/^[a-z0-9\-\/]+$/i.test(slug)) return next();

    const target = path.resolve(BLOG_DIR, slug + '.html');
    if (!target.startsWith(BLOG_DIR + path.sep)) return next(); // traversal guard
    if (!fs.existsSync(target)) return next();

    res.sendFile(target);
});

// Bare /recover has no index page; send visitors to the homepage.
app.get('/recover', (req, res) => res.redirect(301, '/'));
app.get('/recover/', (req, res) => res.redirect(301, '/'));

// Campaign landing pages: /recover/<slug>, with or without .html.
app.get(/^\/recover\/(.+)$/, (req, res, next) => {
    let slug = req.params[0].replace(/\.html$/, '');
    if (!/^[a-z0-9\-]+$/i.test(slug)) return next();

    const target = path.resolve(RECOVER_DIR, slug + '.html');
    if (!target.startsWith(RECOVER_DIR + path.sep)) return next(); // traversal guard
    if (!fs.existsSync(target)) return next();

    res.sendFile(target);
});

// ---------------------------------------------------------------------------
// 404 + error handling
// ---------------------------------------------------------------------------
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    if (res.headersSent) return next(err);
    res.status(500).json({ error: 'Internal server error' });
});

// ---------------------------------------------------------------------------
if (!process.env.POSTGRES_URL) {
    console.warn('WARNING: POSTGRES_URL is not set lead submissions will fail.');
}

app.listen(PORT, HOST, () => {
    console.log(`ReclaimGuard server listening on http://${HOST}:${PORT}`);
});
