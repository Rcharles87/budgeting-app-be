const express = require("express");
const app = express()
const budgetController = require("./controllers/budgetControllers.js");
const cors = require("cors");

//middle ware

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Welcome to budget app")
})

app.use("/transactions", budgetController);

module.exports = app;