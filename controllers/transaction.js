const {Transaction, Counter} = require("../model/transaction");
const Account = require("../model/account");

async function sendMoney(req, res){
    const {fromAccount, toAccount, amount} = req.body;
    const senderAccount = await Account.findOne({account_number : fromAccount});
    if(!senderAccount) return res.status(404).json({msg : "invalid sender account"})
    if(senderAccount.balance<amount) return res.json({msg: "insufficient balance"})
    const receiverAccount = await Account.findOne({account_number : toAccount});
    if(!receiverAccount) return res.status(404).json({msg : "invalid receiver account"})
    const senderAccount1 = await Account.findOneAndUpdate({account_number : fromAccount},{$inc : {balance : -amount}})
    const receiverAccount1 = await Account.findOneAndUpdate({account_number : toAccount},{$inc : {balance : amount}})
    const counterRecords = await Counter.find();
    const counterRecord = counterRecords[0].counter+1;
    const transaction = await Transaction.create({transactionId : counterRecord, fromAccount, toAccount, amount});
    const counterUpdate = await Counter.findOneAndUpdate({},{$inc : {counter : 1}})
    return res.json({msg : `transaction successful with transaction id ${counterRecord}`});
}

module.exports = {sendMoney}