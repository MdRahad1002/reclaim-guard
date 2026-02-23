module.exports = (req, res) => {
    // This is a catch-all for any unmatched routes
    // It serves as a fallback
    res.status(404).json({ error: 'API endpoint not found' });
};
