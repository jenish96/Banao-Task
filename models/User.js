const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    otp: { type: String, default: "0000" },
})

module.exports = mongoose.model("users", userSchema);
