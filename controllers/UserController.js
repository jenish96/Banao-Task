const User = require('../models/User');
const bcrypt = require("bcrypt");
const sendMail = require("../handler/forgot-pwd-mail");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const newUser = async (req, res) => {
    try {
        let payload = req.body;
        const userName = await User.find({ username: payload.username });
        if (userName.length != 0) {
            throw new Error("Username already Exists.")
        } else {
            payload['password'] = bcrypt.hashSync(payload.password, 10);
            const user = new User(payload);
            await user.save();
            res.status(200).json({ message: 'User registered successfully' });
        }
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
}

const userLogin = async (req, res) => {

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User Not Found')
        } else {
            const result = await bcrypt.compare(password, user.password);
            if (!result) throw new Error('Invalid credentials');
            const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
            return res.status(200).json({ message: `Welcome, ${user.name}`, token });
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ "message": "User Not Found!" });
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user['otp'] = otp;
    await user.save();

    sendMail(email, otp)
    return res.status(200).json({ "message": `Mail sent to your Email` })
}

const resetPassword = async (req, res) => {
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
}

module.exports = { newUser, userLogin, forgotPassword, resetPassword }