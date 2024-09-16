const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
    otp : {
        type : Number,
        required : true
    },
    username : {
        type : String,
        required : true,
        ref : "user"
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 60 * 5 , 
    }
})

const Otp = mongoose.model("otp", otpSchema)
module.exports = Otp