const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    console.log(auth)
    if (!auth) {
        return res.status(400).json({"message":"token not found"})
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        decoded.phone = decoded.phone.slice(0,4) + "XXX"
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
}

module.exports = ensureAuthenticated;