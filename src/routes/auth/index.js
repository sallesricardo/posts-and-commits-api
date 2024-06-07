const express = require('express');
const { login, createUser } = require('../../controllers/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
        res.status(400).json({ message: "Bad request! username, password and email are required" });
    }
    const result = await createUser(username, email, password);
    return res.status(201).json(result);
});

router.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
    const access_token = await login(username, email, password);
    res.json({ access_token: access_token })
});

module.exports = router
