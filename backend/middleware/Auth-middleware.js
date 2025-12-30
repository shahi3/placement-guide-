const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);
        console.log('Decoded Token:', decoded);
        req.user = decoded;

        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error.message);
        res.status(400).json({ success: false, message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
