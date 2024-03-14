const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts"
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("likes", likeSchema);