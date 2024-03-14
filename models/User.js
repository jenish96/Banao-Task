const mongoose = require('mongoose');
const validator = require("validator");


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Name"]
        },
        username: {
            type: String,
            unique: [true, "Username already Exist"],
            required: [true, "Please Enter Username"]
        },
        email: {
            type: String,
            unique: [true, "Email Already Exist"],
            required: [true, "Please Enter Email"],
            validate: validator.isEmail,

        },
        password: {
            type: String,
            required: true
        },
        otp: { type: String, default: "0000" },
    },
    {
        timestamps: true
    })

module.exports = mongoose.model("users", userSchema);
