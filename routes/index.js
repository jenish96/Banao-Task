const express = require("express");
const User = require('../models/User');
const bcrypt = require("bcrypt");
const sendMail = require("../handler/forgot-pwd-mail");
const app = express();

app.post("/register", async (req, res) => {
    try {
        let payload = req.body;
        payload['password'] = bcrypt.hashSync(payload.password, 10);
        const user = new User(payload);
        const result = await user.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            res.status(400).json({
                "message": "Please Enter Username and Password"
            });
        } else {
            const user = await User.findOne({ "username": username });
            if (user) {
                const result = await bcrypt.compare(password, user.password);
                (!result) ? res.status(200).json({ "message": "Invalid User Credentials" })
                    : res.status(200).json({ "message": `Welcome, ${user.name}` });
            } else {
                res.status(400).json({ "message": "User Not Found!" });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ "message": "User Not Found!" });
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user['otp'] = otp;
    await user.save();

    sendMail(email, otp)
    return res.status(200).json({ "message": `Mail sent to your Email` })
})

app.post("/reset-password", async (req, res) => {
    try {
        const { email, password, otp } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ "message": 'User not found' });
        }
        if (user.otp != otp) return res.status(400).json({ "message": 'Invalid OTP' });
        user.password = await bcrypt.hashSync(password, 10);
        user.save();

        return res.status(200).send('Password updated successfully');
    } catch (error) {
        return res.status(400).send('Failed to update password: ' + error.message);
    }
})


module.exports = app