const jwt = require('jsonwebtoken');
require('dotenv').config()

function Auth(req, res, next) {
    try {
        if (!req.headers.authorization) {
            throw new Error('No token provided' );
        }
        const token = (req.headers.authorization).split(' ')[1];
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                throw new Error('Invalid token');
            }
            req.user = decoded;
            next();
        });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

module.exports = Auth;