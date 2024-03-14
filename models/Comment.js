const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts"
        },
        text: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("comments", commentSchema);