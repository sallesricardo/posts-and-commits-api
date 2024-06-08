const express = require('express');
const { authMiddleware } = require('../../controllers/auth');
const { getPosts } = require('../../controllers/posts');
const { savePostDB, updatePostDB, deletePostDB } = require('../../entities/posts');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    const userId = req.headers.user?.id;
    const { page: spage, limit: slimit } = req.query;
    const page = Number(spage) || 1;
    const limit = Number(slimit) || 10;
    const posts = await getPosts({ page, limit });
    return res.json({ page, size: posts.length, posts });
});

router.get('/:user_id', authMiddleware, async (req, res) => {
    const postsFromUserId = Number(req.params.user_id) || 0;
    const { page: spage, limit: slimit } = req.query;
    const page = Number(spage) || 1;
    const limit = Number(slimit) || 10;
    const posts = await getPosts({ userId: postsFromUserId, page, limit });
    return res.json({ page, size: posts.length, posts });
});

router.post('/', authMiddleware, async (req, res) => {
    const userId = req.headers.user?.id;
    const { title, description } = req.body;
    try {
        const result = await savePostDB({ userId, title, description });
        return res.status(201).json({ post_id: result });
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
});

router.put('/:post_id', authMiddleware, async (req, res) => {
    const userId = req.headers.user?.id;
    const postId = req.params.post_id;
    const { title, description } = req.body;
    try {
        const result = await updatePostDB({ postId, userId, title, description });
        return res.status(201).json(result);
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
});

router.delete('/:post_id', authMiddleware, async (req, res) => {
    const userId = req.headers.user?.id;
    const postId = req.params.post_id;
    try {
        await deletePostDB({ postId, userId });
        return res.json({ message: "Post deleted" });
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
});

module.exports = router;

