const mongoose = require("mongoose")
const mongooseAutoIncrement = require("mongoose-auto-increment");
const connectTOMongoDB = require("../connection");
mongooseAutoIncrement.initialize(mongoose.connection);


const counterSchema = new mongoose.Schema({
    counter : {
      type : Number,
      unique : true
    }
})
const transactionSchema = new mongoose.Schema({
    transactionId : {
        type : Number,
        unique : true
    },
    fromAccount : {
        type : Number,
        ref : "account"
    },
    toAccount : {
      type : Number,
      ref : "account"
    },
    amount : {
        type : Number,
    }
},   
    {timestamps: true}
)


const Transaction = mongoose.model("transaction", transactionSchema);
const Counter = mongoose.model("counter",counterSchema);

module.exports = {Transaction, Counter}