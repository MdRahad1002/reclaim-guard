const fs = require('fs');
const path = require('path');

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
        // Map URL paths to HTML files
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
        } else if (pathname.startsWith('/assets/')) {
            // Serve assets
            filePath = pathname.substring(1); // Remove leading /
        } else if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|json|txt|xml|woff|woff2|ttf|eot)$/)) {
            // Serve static files
            filePath = pathname.substring(1); // Remove leading /
        } else {
            // Default to index.html for SPA routing
            filePath = 'index.html';
        }

        // Read the file from the project root
        const fullPath = path.join(process.cwd(), filePath);
        
        // Security: prevent directory traversal
        if (!path.resolve(fullPath).startsWith(path.resolve(process.cwd()))) {
            res.status(400).json({ error: 'Invalid path' });
            return;
        }

        // Check if file exists
        if (!fs.existsSync(fullPath)) {
            // If it's not a static asset, serve index.html (SPA)
            if (!pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|json|txt|xml|woff|woff2|ttf|eot)$/)) {
                const indexPath = path.join(process.cwd(), 'index.html');
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

        // Read and serve the file
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Set appropriate content type
        let contentType = 'text/plain';
        if (filePath.endsWith('.html')) {
            contentType = 'text/html; charset=utf-8';
        } else if (filePath.endsWith('.js')) {
            contentType = 'application/javascript; charset=utf-8';
        } else if (filePath.endsWith('.css')) {
            contentType = 'text/css; charset=utf-8';
        } else if (filePath.endsWith('.json')) {
            contentType = 'application/json';
        } else if (filePath.match(/\.(jpg|jpeg)$/)) {
            contentType = 'image/jpeg';
        } else if (filePath.endsWith('.png')) {
            contentType = 'image/png';
        } else if (filePath.endsWith('.gif')) {
            contentType = 'image/gif';
        } else if (filePath.endsWith('.svg')) {
            contentType = 'image/svg+xml';
        } else if (filePath.endsWith('.ico')) {
            contentType = 'image/x-icon';
        }

        res.setHeader('Content-Type', contentType);
        res.status(200).send(content);
    } catch (error) {
        console.error('Error serving file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
