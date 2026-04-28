module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Cache-Control', 'no-store');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Vercel automatically sets x-vercel-ip-country on every request
    const country = req.headers['x-vercel-ip-country'] || null;

    res.status(200).json({ country });
};
