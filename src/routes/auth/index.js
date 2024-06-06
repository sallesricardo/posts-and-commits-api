const express = require('express');
const { login } = require('../../auth');

const router = express.Router();

router.post('/login', (req, res) => {
        const { username, password } = req.body;
        const access_token = login(username, password);
        res.json({ access_token: access_token })
    }
)

module.exports = router
