const jwt = require('jsonwebtoken');
const { createUser: createUserDB, verifyUser } = require('../../entities/user/UserRepository');
const { JWT_SECRET } = require('../../settings');

async function createUser(user, email, password) {
    const id = await createUserDB(user, email, password);
    return {
        id,
        username: user,
        email,
    }
}

async function login(username, email, password) {
    const user = await verifyUser(username, email, password);
    if (user && user.auth) {
        const token = jwt.sign({
            id: user.id,
            user: user.username
        }, JWT_SECRET, { expiresIn: 300 });
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
            return res.status(400).json({ message: "Invalid token" });
        }
        const jwtPayload = jwt.verify(token, JWT_SECRET);
        const user = jwtPayload.user;
        console.log('User:', JSON.stringify(user));
        req.headers['user'] = user;
        return next();
    } catch(error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = {
    createUser,
    login,
    auth,
}

