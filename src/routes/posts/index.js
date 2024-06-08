const express = require('express');
const { authMiddleware } = require('../../controllers/auth');
const { getPosts } = require('../../controllers/posts');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    const userId = req.headers.user?.id;
    const { page: spage, limit: slimit } = req.query;
    const page = Number(spage) || 1;
    const limit = Number(slimit) || 10;
    const posts = await getPosts({ userId, page, limit });
    return res.json({ page, size: posts.length , posts });
});

router.get('/:user_id', authMiddleware, (req, res) => {
    const userId = req.headers.user?.id;
    const postsFromUserId = Number(req.params.user_id) || 0;
    const { page=1, limit=10 } = req.query;

    return res.json({userId, postsFromUserId, page, limit});
});

module.exports = router;

