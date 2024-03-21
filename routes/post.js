const express = require("express");
const { newPost, getPost, updatePost, deletePost } = require("../controllers/PostController");
const { likePost, commentPost, getPostLikes, getPostComments } = require("../controllers/PostActivityController");
const app = express();
const Auth = require("../middleware/auth");


app.get("/", Auth, getPost);
app.post("/new", Auth, newPost);
app.put("/:postId", Auth, updatePost)
app.delete("/:postId", Auth, deletePost)

app.post("/like/:postId", Auth, likePost);
app.post("/comment/:postId", Auth, commentPost);

app.get("/:postId/likes", Auth, getPostLikes);
app.get("/:postId/comments", Auth, getPostComments);


module.exports = app