const userModel = require('../models/User');
const postModel = require('../models/Post');
const commmentModel = require('../models/Comment');



const commentpost = async (req, res) => {
    const { content, userId, postId } = req.body;

    try {
        const user = await userModel.findById(userId);
        const post = await postModel.findById(postId);
        const commentuser = await commmentModel.create({
            content,
            author: user._id,
        })

        post.Comment.push(commentuser._id);
        await post.save()

        res.status(200).json({ commentuser, msg: 'comment added' })
    } catch (error) {
        res.status(400).json({ error, msg: 'comment added failed' })
    }
}

module.exports = { commentpost };