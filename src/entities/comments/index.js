const db = require('../../db');

async function getCommentsDB({ postId, commentId, page, limit }) {
    const offset = (page - 1) * limit;
    const query = db('comments as c')
        .select(['c.id', 'c.user_id', 'u.name', 'c.description'])
        .join('users as u', 'u.id', 'c.user_id')
        .where(function() {
            if (commentId) {
                this.where('c.id', commentId);
            } else {
                this.where('c.post_id', postId);
            }
        })
        .offset(offset)
        .limit(limit);
    return await query;
}

async function saveCommentDB({ userId, postId, description }) {
    const query = db('comments')
        .insert({
            user_id: userId,
            post_id: postId,
            description,
        })
    return await query;
}

async function updateCommentDB({ commentId, description }) {
    const query = db('comments')
        .update({
            description,
        })
        .where('id', commentId);
    return await query;
}

async function deleteCommentDB({ commentId }) {
    const query = db('comments')
        .delete()
        .where('id', commentId);
    return await query;
}

module.exports = {
    getCommentsDB,
    saveCommentDB,
    updateCommentDB,
    deleteCommentDB,
}

