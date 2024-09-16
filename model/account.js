const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    account_number : {
        type : Number,
        unique : true,
    },
    account_type : {
        type : String,
    },
    balance : {
        type : Number,
        default : 0,
    },
    username : {
        type : String,
        ref : "user"
    }
    },
         {timestamps: true}
)

const account = mongoose.model("account", accountSchema)

module.exports = account