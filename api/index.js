const fs = require('fs');
const path = require('path');

// Get the actual project root path
const getProjectRoot = () => {
    // In Vercel, files are at /var/task
    // In local, they're in the current directory
    let root = process.cwd();
    if (fs.existsSync(path.join(root, 'styles.css'))) {
        return root;
    }
    if (fs.existsSync(path.join(root, '..', 'styles.css'))) {
        return path.join(root, '..');
    }
    if (fs.existsSync(path.join(root, '../..', 'styles.css'))) {
        return path.join(root, '../..');
    }
    return root;
};

const projectRoot = getProjectRoot();

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

    try {
        // Map URL paths to files
        let filePath;
        const pathname = req.url.split('?')[0]; // Remove query string

        if (pathname === '/' || pathname === '') {
            filePath = 'index.html';
        } else if (pathname === '/admin') {
            filePath = 'admin.html';
        } else if (pathname === '/privacy') {
            filePath = 'privacy.html';
        } else if (pathname === '/terms') {
            filePath = 'terms.html';
        } else if (pathname.startsWith('/assets/') || pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|json|txt|xml|woff|woff2|ttf|eot)$/)) {
            // Serve static files - strip leading slash
            filePath = pathname.substring(1);
        } else if (pathname.startsWith('/api/')) {
            // API routes should be handled by specific handlers
            return res.status(404).json({ error: 'API endpoint not found' });
        } else {
            // Default to index.html for SPA routing
            filePath = 'index.html';
        }

        // Construct full path
        const fullPath = path.join(projectRoot, filePath);
        
        // Security: prevent directory traversal
        const resolvedPath = path.resolve(fullPath);
        const resolvedRoot = path.resolve(projectRoot);
        if (!resolvedPath.startsWith(resolvedRoot)) {
            res.status(400).json({ error: 'Invalid path' });
            return;
        }

        // Check if file exists
        if (!fs.existsSync(fullPath)) {
            // If it's not a static asset, serve index.html (SPA)
            if (!pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|json|txt|xml|woff|woff2|ttf|eot)$/)) {
                const indexPath = path.join(projectRoot, 'index.html');
                if (fs.existsSync(indexPath)) {
                    const content = fs.readFileSync(indexPath, 'utf8');
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.status(200).send(content);
                    return;
                }
            }
            res.status(404).json({ error: 'Not found' });
            return;
        }

        // Determine if file is binary
        const isBinary = filePath.match(/\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/);

        // Read the file
        const content = isBinary 
            ? fs.readFileSync(fullPath)
            : fs.readFileSync(fullPath, 'utf8');
        
        // Set appropriate content type and cache headers
        let contentType = 'text/plain';
        let cacheControl = 'public, max-age=3600';

        if (filePath.endsWith('.html')) {
            contentType = 'text/html; charset=utf-8';
            cacheControl = 'public, max-age=3600';
        } else if (filePath.endsWith('.js')) {
            contentType = 'application/javascript; charset=utf-8';
            cacheControl = 'public, max-age=31536000, immutable';
        } else if (filePath.endsWith('.css')) {
            contentType = 'text/css; charset=utf-8';
            cacheControl = 'public, max-age=31536000, immutable';
        } else if (filePath.endsWith('.json')) {
            contentType = 'application/json';
            cacheControl = 'public, max-age=3600';
        } else if (filePath.match(/\.(jpg|jpeg)$/)) {
            contentType = 'image/jpeg';
            cacheControl = 'public, max-age=31536000, immutable';
        } else if (filePath.endsWith('.png')) {
            contentType = 'image/png';
            cacheControl = 'public, max-age=31536000, immutable';
        } else if (filePath.endsWith('.gif')) {
            contentType = 'image/gif';
            cacheControl = 'public, max-age=31536000, immutable';
        } else if (filePath.endsWith('.svg')) {
            contentType = 'image/svg+xml';
            cacheControl = 'public, max-age=31536000, immutable';
        } else if (filePath.endsWith('.ico')) {
            contentType = 'image/x-icon';
            cacheControl = 'public, max-age=31536000, immutable';
        } else if (filePath.endsWith('.woff')) {
            contentType = 'font/woff';
            cacheControl = 'public, max-age=31536000, immutable';
        } else if (filePath.endsWith('.woff2')) {
            contentType = 'font/woff2';
            cacheControl = 'public, max-age=31536000, immutable';
        } else if (filePath.endsWith('.ttf')) {
            contentType = 'font/ttf';
            cacheControl = 'public, max-age=31536000, immutable';
        } else if (filePath.endsWith('.eot')) {
            contentType = 'application/vnd.ms-fontobject';
            cacheControl = 'public, max-age=31536000, immutable';
        }

        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', cacheControl);
        res.status(200).send(content);
    } catch (error) {
        console.error('Error serving file:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};
