const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("XD: ", decoded)
        const { user_id } = decoded;

        const { data, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', user_id)
            .single();

        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }

        req.user = decoded;

        if (req.originalUrl.includes("/api/hotels")) {
            if (data.role !== 'admin') {
                return res.status(403).json({ error: 'Not authorized to access hotels' });
            }
        }

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
