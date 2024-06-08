const db = require('../../db');

async function getPostsDB({ userId, page, limit }) {
    const offset = page * limit;
    const query = db('posts')
        .select(['id', 'user_id', 'title', 'description'])
        .where(function() {
            if (userId) {
                this.where('user_id', userId);
            }
        })
        .orderBy('created_at', 'desc')
        .offset(offset)
        .limit(limit);
    console.log(query.toString());
    return await query;
}

async function savePostDB({ userId, title, description }) {
    const result = await db('posts')
        .insert({
            user_id: userId,
            title,
            description,
        });
    return result[0];
}

async function updatePostDB({ postId, userId, title, description }) {
    const post = await db('posts')
        .select(['user_id', 'title', 'description'])
        .where('id', postId)
        .first();
    if (userId !== post['user_id']) {
        throw Error('User cannot own this post');
    }
    const result = await db('posts')
        .update({
            title,
            description,
            })
        .where('id', postId);
    return result;
}

async function deletePostDB({ postId, userId }) {
    const post = await db('posts')
        .select(['user_id', 'title', 'description'])
        .where('id', postId)
        .first();
    if (userId !== post['user_id']) {
        throw Error('User cannot own this post');
    }
    const result = await db('posts')
        .delete()
        .where('id', postId);
    return result;
}

module.exports = {
    getPostsDB,
    savePostDB,
    updatePostDB,
    deletePostDB,
}

