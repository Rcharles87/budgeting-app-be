const express = require("express");
const transactionRoutes = express.Router();
const transactionsArr = require("../models/transactions.js")


transactionRoutes.get("/", (req, res)=>{
    res.json(transactionsArr)
});

transactionRoutes.get("/:index", (req,res)=>{
    const { index } = req.params
    if(transactionsArr[index]){
        res.json(transactionsArr[index])
    }else{
        res.status(404).json({error: "Not Found"})
    }
});

transactionRoutes.post("/", (req,res)=>{
   transactionsArr.push(req.body);
   res.json(transactionsArr[transactionsArr.length-1]);
});

transactionRoutes.delete("/:index", (req,res)=>{
    const { index } = req.params
    if(transactionsArr[index]){
        const deleteTransaction = transactionsArr.splice(index,1)
        res.json(deleteTransaction[0]);
    }else{
        res.status(404).json({error: "Not Found"})
    }
});

transactionRoutes.put("/:index", (req,res)=>{
    let { index } = req.params;

    if(!transactionsArr[index]){
        res.status(404).json({
            error: "Not Found"
        })
        return;
    }

    let { itemName, amount, date, from, category } = req.body;
    if (itemName && amount && date && from && category){
        transactionsArr[index] = {
            itemName , amount, date , from, category
        };
        res.json(transactionsArr[index]);
    }else{
        res.status(404).json({error: "Please Provide All Fields!"})
    }
});

module.exports = transactionRoutes