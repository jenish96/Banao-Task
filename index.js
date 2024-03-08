const express = require("express");
const userRoute = require('./routes/index')
const app = express();

require("./config");
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/",async(req,res)=>{
    res.send("Working..");
})

app.use("/api/v1/user",userRoute);


app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1.${PORT}`)
})