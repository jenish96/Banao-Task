const express = require("express");
const { newUser, userLogin, forgotPassword, resetPassword } = require("../controllers/UserController");
const app = express();
const Auth = require("../middleware/auth");


app.post("/register", newUser);
app.post("/login", userLogin);
app.post("/forgot-password", Auth, forgotPassword);
app.post("/reset-password", Auth, resetPassword);


module.exports = app