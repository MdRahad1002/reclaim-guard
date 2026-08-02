const geoip = require('geoip-lite');

function clientIp(req) {
    let ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
        || req.headers['x-real-ip']
        || (req.socket && req.socket.remoteAddress)
        || '';
    if (ip.indexOf('::ffff:') === 0) ip = ip.slice(7); // unwrap IPv4-mapped IPv6
    return ip;
}

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Cache-Control', 'no-store');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Caddy forwards the real client IP in X-Forwarded-For (server trusts the
    // proxy). Look the country up locally via geoip-lite: no external call,
    // no rate limit. Replaces the old Vercel-only x-vercel-ip-country header.
    let country = null;
    try {
        const ip = clientIp(req);
        const geo = ip ? geoip.lookup(ip) : null;
        if (geo && geo.country) country = geo.country;
    } catch (e) {
        country = null;
    }

    res.status(200).json({ country });
};
