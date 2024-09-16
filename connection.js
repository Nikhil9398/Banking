const mongoose = require("mongoose");

async function connectToMongoDB(url){
    return mongoose.connect(url)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=>console.log("error in connection with mongodb",err))
}

module.exports = {
    connectToMongoDB,
}