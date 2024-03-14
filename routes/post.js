const express = require("express");
const { newPost, getPost, updatePost, deletePost } = require("../controllers/PostController");
const { likePost, commentPost, getPostLikes, getPostComments } = require("../controllers/PostActivityController");
const app = express();


app.get("/", getPost);
app.post("/new", newPost);
app.put("/:postId", updatePost)
app.delete("/:postId", deletePost)

app.post("/like/:postId", likePost);
app.post("/comment/:postId", commentPost);

app.get("/:postId/likes", getPostLikes);
app.get("/:postId/comments", getPostComments);


module.exports = app