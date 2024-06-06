const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../settings');

const users = {
    id: 1,
    username: 'ricardo',
    password: 'password',
}

function login(user, password) {
    if (user === users.username && password === users.password) {
        const token = jwt.sign({ id: users.id }, JWT_SECRET, { expiresIn: 300 });
        return token
    }
    return false;
}

function auth(req, res, next) {
    const authorization = req.headers.authorization;
    try {
        const token = authorization?.split(' ')[1] || false ;
        if (!token) {
            console.error(`Invalid token: ${token}`);
            res.status(400).json({ message: "Invalid token" });
            return
        }
        const jwtPayload = jwt.verify(token, JWT_SECRET);
        const user = jwtPayload.user;
        console.log(user);
        req.headers['user'] = user;
        return next();
    } catch(error) {
        console.error(error);
        res.status(400).json({ message: "Unauthorized" });
        return
    }
}

module.exports = {
    login,
    auth,
}

