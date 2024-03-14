const Post = require("../models/Post")

// API for create new a post
const newPost = async (req, res) => {
    try {
        const payload = req.body;
        const post = new Post(payload);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).send('Failed to create Post: ' + error.message);
    }
}

// API for get all post
const getPost = async (req, res) => {
    try {
        // const posts = await Post.find().populate('user');
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "post",
                    as: "likes"
                }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "post",
                    as: "comments"
                }
            },
            {
                $addFields: {
                    likes: { $size: "$likes" },
                    comments: { $size: "$comments" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    _id: 1,
                    content: 1,
                    user: "$user.username",
                    likes: 1,
                    comments: 1
                }
            }
        ])
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).send('Failed to fetch Posts: ' + error.message);
    }
}

// API for update a post
const updatePost = async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.findByIdAndUpdate(req.params.postId, { content }, { new: true });
        res.status(200).json("Post updated Successfully");
    } catch (error) {
        res.status(400).send('Failed to update : ' + error.message);
    }
}

// API for Delete a post
const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).send('Post deleted successfully');
    } catch (error) {
        res.status(400).send('Failed to delete : ' + error.message);
    }
}



module.exports = { newPost, getPost, updatePost, deletePost }

