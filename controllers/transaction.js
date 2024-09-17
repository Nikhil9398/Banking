const {Transaction, Counter} = require("../model/transaction");
const Account = require("../model/account");

async function sendMoney(req, res){
    const {fromAccount, toAccount, amount} = req.body;
    console.log(fromAccount);
    const senderAccount = await Account.findOne({account_number : fromAccount});
    if(!senderAccount) return res.status(404).json({msg : "invalid sender account"})
    if(senderAccount.balance<amount) return res.json({msg: "insufficient balance"})
    const receiverAccount = await Account.findOne({account_number : toAccount});
    if(!receiverAccount) return res.status(404).json({msg : "invalid receiver account"})
    const senderAccount1 = await Account.findOneAndUpdate({account_number : fromAccount},{$inc : {balance : -amount}})
    const receiverAccount1 = await Account.findOneAndUpdate({account_number : toAccount},{$inc : {balance : amount}})
    const counterRecord = await Counter.find();
    console.log(counterRecord[0].counter);
    return res.json();
}

module.exports = {sendMoney}