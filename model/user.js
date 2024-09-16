const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,                                             //this key need to be added as foreign key
        required : true,
        unique : true,
    },
    password : {
        type : Array,
        required : true,
    },
    first_name : {
        type : String,
        required : true,
    },
    last_name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    phone_number : {
        type : Number,
        required : true,
        unique : true,
    },
    address : {
        type : String,
        required : true,
    },
    father_name : {
        type : String,
        required : true
    },
    mother_name : {
        type : String,
        required : true
    },

    date_of_birth : {
        type : Date,
        required : true
    },
    
    gender : {
        type : String,
        required : true
    },
    pan : {
        type : String,
        required : true
    },
    photo : {                                                           //need to update 
        type : String,
        default : "nothing",
    },
    
},
    {timestamps: true}
)

const User = mongoose.model("user", userSchema);

module.exports = User

// const mongoose = require("mongoose")

// const userSchema = new mongoose.Schema({
//     name : {
//         type : String,
//         required: true,
//     },
//     email : {
//         type : String,
//         required : true,
//         unique: true,
//     },
//     role: {
//         type: String,
//         required: true,
//         default: "NORMAL",
//     },
//     password: {
//         type: String,
//         required: true,
//     },
    
// },
// { timestamps:true});

// const User = mongoose.model('user', userSchema);
// module.exports = User