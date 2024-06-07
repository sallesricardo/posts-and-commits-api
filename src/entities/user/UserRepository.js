const bcrypt = require('bcryptjs');
const db = require('../../db');

const saltRounds = 10;

function encriptPassword(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function verifyPassword(password, storedHash) {
    return bcrypt.compareSync(password, storedHash);
}

async function createUser(username, email, password) {
    const result = await db('users').insert({
        name: username,
        email: email,
        password: encriptPassword(password),
    })
    return result[0];
}

async function verifyUser(username, email, password) {
    const userFound = await db('users')
        .select('id', 'name', 'password', 'email')
        .where(function () {
            if (email) {
                this.where('email', email);
            } else {
                this.where('name', username);
            }
        }).first();
    if (!userFound) return false;
    return {
        id: userFound.id,
        username: userFound.name,
        auth: verifyPassword(password, userFound['password']),
    };
}

module.exports = {
    createUser,
    verifyUser,
}

