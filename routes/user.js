const express = require("express");
const User = require('../models/User');
const bcrypt = require("bcrypt");
const sendMail = require("../handler/forgot-pwd-mail");
const { newUser, userLogin, forgotPassword, resetPassword } = require("../controllers/UserController");
const app = express();

app.post("/register", newUser);
app.post("/login", userLogin);
app.post("/forgot-password", forgotPassword);
app.post("/reset-password", resetPassword);


module.exports = app