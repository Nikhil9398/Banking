const User = require("../model/user")
const Account = require("../model/account")
const Otp = require("../model/otp")
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = "Nikhil$123@$"


//accepts account number, username, email
async function forgotPassword(req, res){
    const { account_number, username, email, phone_number} = req.body;
    if(!account_number || !username || !email || !phone_number){
        return res.status(403).json({msg : "Details are missing"})
    }
    const user = await User.findOne({username, email, phone_number})
    if(!user){
       return res.status(400).json({msg : "Details are not correct"})
    }
    const account = await Account.findOne({username, account_number})
    if(!account){
        return res.status(400).json({msg : "Details are not correct"})
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    
    const auth = nodemailer.createTransport({
        service : "gmail",
        secure : true,
        port : 465,
        auth : {
            user : "factsandupdates5@gmail.com",
            pass : "ymxj yczy nyvi rnwa"
        }
    })

    const receiver = {
        from : "factsandupdates5@gmail.com",
        to : email,
        subject : "OTP to generate new Password",
        text : `your otp to generate new password for Nikhil Banking is ${otp}. Please don't share this to anybody.`
    }

    auth.sendMail(receiver, (error, emailResponse)=>{
        if(error)
            throw error;
        console.log("success");
        response.end();
    })
    
    const otpDocument = await Otp.findOneAndDelete({username})
    await Otp.create({
        otp,
        username
    })
    
    return res.json({msg : `OTP sent to ${email} successfully`, username : username});
}

async function validateOtp(req, res){
    const{ otp, username} = req.body;
    const otpDocument = await Otp.findOne({otp, username})
    if(!otpDocument){
        return res.json({msg : "incorrect otp. Please try again"})
    }
    return res.json({msg : "Otp verified Successfully", username : username})
}

async function passwordGeneration(req, res){
    const {password, username} = req.body;
    const hashedPassword = await encryptPassword(password);
    const user = await User.findOne({username : username});
    let passwordArray = user.password;
    if(!user){
        return res.json({msg : "No user found"})
    }
    for(let i=0;i<passwordArray.length;i++){
        if(await bcrypt.compare(password,passwordArray[i])){
            return res.json({msg : "Password already present in your old password list. So, please enter another new password"})
        }
    }
    const passwordArrayLength = passwordArray.length;
    if(passwordArrayLength>=5){
        passwordArray.shift(); // Remove the first element
        passwordArray.length = Math.min(passwordArrayLength, 4);
    }
    passwordArray.push(hashedPassword);
    const updateUser = await User.updateOne({username},{
        $set: {
            password : passwordArray
        }
     })

    return res.json({msg : "New Password updated successfully", user : user})
    //console.log(hashedPassword)
    //console.log(await bcrypt.compare("Nikhil",hashedPassword))
}

async function handleUserLogin(req, res){
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return await res.status(404).json({msg : "invalid username"})
    }
    const hashedPassword = user.password[user.password.length-1];
    if(! await bcrypt.compare(password,hashedPassword)){
        return await res.status(404).json({msg : "incorrect password"})
    }
    const token = jwt.sign({_id : user._id,
                            email : user.email,
                            role: user.role,
                            }, secret);
    res.cookie("token", "Bearer "+token);
    return res.status(200).json({msg : "login success"})
}
async function userCreate(req, res){
    
    const { 
        username,  
        first_name, 
        last_name, 
        email, 
        phone_number, 
        address, 
        father_name, 
        mother_name, 
        date_of_birth,
        gender,
        pan,
        photo
                } = req.body;

        if(!username || !first_name || !last_name || !email || !phone_number || !address || !father_name || !mother_name || !date_of_birth || !gender || !pan || !photo){
            return res.status(400).json({msg : "All fields are required"})
        }
        
        const password = ["abc123"];
        
        const user = await User.create({
            username, 
            password,
            first_name, 
            last_name, 
            email, 
            phone_number, 
            address, 
            father_name, 
            mother_name, 
            date_of_birth,
            gender,
            pan,
            photo
        })
        
    
        return res.status(201).json({msg: "success", id : user._id});
    
}


async function encryptPassword(password){
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
    
}



module.exports= {
    forgotPassword,
    handleUserLogin,
    userCreate,
    validateOtp,
    passwordGeneration
}