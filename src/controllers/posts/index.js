const { getPostsDB } = require("../../entities/posts")


async function getPosts({
    userId,
    page,
    limit,
}) {
    const posts = await getPostsDB({ userId, page, limit });
    return posts;
}

module.exports = {
    getPosts,
}

