const express = require("express");
const routes = require('./routes/index')
const app = express();

require("./config/db");
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1", routes);

app.get("/", async (req, res) => {
    res.send("Working..");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1.${PORT}`)
})