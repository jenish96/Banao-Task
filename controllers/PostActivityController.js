const Like = require("../models/Like")
const Comment = require("../models/Comment")
const Post = require("../models/Post")
const mongoose = require('mongoose');


// API for liking a post
const likePost = async (req, res) => {
    try {
        const userId = req.user.userId;
        const post = await Post.findById(req.params.postId);
        if (!post) throw new Error('Post not found');
        const likes = await Like.find({ user: userId, post: req.params.postId })
        if (likes.length != 0) {
            return res.status(200).send({ "message": 'Post already liked' });
        }
        const like = new Like({ user: userId, post: req.params.postId });
        await like.save();
        return res.status(200).send('Post liked');
    } catch (error) {
        res.status(400).send({ 'error': error.message });
    }
}

// API for Comment on a post
const commentPost = async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.findById(req.params.postId);
        if (!post) throw new Error('Post not found');
        const comment = new Comment({ user: req.user.userId, text, post: req.params.postId });
        await comment.save();
        res.status(200).send('Comment added');
    } catch (error) {
        res.status(400).send({ 'error': error.message });
    }
}

const getPostLikes = async (req, res) => {
    try {
        const { postId } = req.params;
        const likes = await Like.find({ post: postId }).populate('user', 'username').populate('post', 'content');
        res.status(200).json(likes);
    } catch (error) {
        res.status(400).send({ 'error': error.message });
    }
};


const getPostComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId }).populate('user', 'username').populate('post', 'content');
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).send({ 'error': error.message });
    }
}

module.exports = { likePost, commentPost, getPostLikes, getPostComments }
