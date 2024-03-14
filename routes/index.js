const express = require("express");
const app = express();
const userRoute = require("./user");
const postRoute = require("./post");

app.use("/user", userRoute);
app.use("/post", postRoute);

module.exports = app