const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        content: {
            type: String,
            required: [true, "Please Enter Content"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("posts", postSchema);