const Account = require("../model/account");
const {Transaction} = require("../model/transaction")

async function viewPassbook(req, res){                                //accepts username and fetches balance and transaction history
    const username = req.params.username;
    const account = await Account.findOne({username});
    if(!account) return await res.status(404).json({msg : "invalid username"});
    const account_number = account.account_number;
    const transaction = await Transaction.find({$or: [{fromAccount : account.account_number},{toAccount : account.account_number}]})
    if(!transaction) return await res.status(200).json({msg : "invalid bank account"});
    return res.status(200).json({account : account, transaction : transaction});
}

module.exports = {
    viewPassbook,
}