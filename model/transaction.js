const mongoose = require("mongoose")
const mongooseAutoIncrement = require("mongoose-auto-increment");
const connectTOMongoDB = require("../connection");
mongooseAutoIncrement.initialize(mongoose.connection);

const transactionSchema = new mongoose.Schema({
    transactionId : {
        type : Number,
        default : 1000000,
    },
    username : {
        type : String,
        ref : "user"
    }
},   
    {timestamps: true}
)

transactionSchema.plugin(mongooseAutoIncrement.plugin,'transaction')

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction