const express = require("express");
const app = express();
const path = require("path")                                    //extra
const PORT = 8001;
const {connectToMongoDB} = require("./connection");
app.use(express.json());
const cookieParser = require("cookie-parser");

connectToMongoDB("mongodb://localhost:27017/Bank")
    
app.use(cookieParser());
const userRoute = require("./routes/user")
const accountRoute = require("./routes/account")
const transactionRoute = require("./routes/transaction")


app.use("/user", userRoute )
app.use("/account", accountRoute)
app.use("/transaction", transactionRoute)


app.listen(PORT, ()=> console.log(`Server listening at port ${PORT}`))

