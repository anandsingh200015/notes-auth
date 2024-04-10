const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "JUSTforTesting";

const signup = async (req,res) => {

    
    const {username, email, password} = req.body;
    try{
        //checking existing user
        const existingUser = await userModel.findOne({email : email});
        if(existingUser){
            return res.status(400).json({message: "User Already Exits"});
        }

        //Hasesd Password
        const hasedPassword = await bcrypt.hash(password,10);

        const result = await userModel.create({
            email : email,
            password : hasedPassword,
            username : username
        });

        //Token generate
        const token = jwt.sign({email : result.email, id : result._id}, SECRET_KEY);
        res.status(201).json({user:result, token : token});
    } catch(error){
        console.log(error); 
        res.status("500").json({message:"Internal Server Error"});
    }

}

const signin = async (req,res) => {

    const {email, password} = req.body;

    try{
      //Check for record is present or not
        const existingUser = await userModel.findOne({email:email});
        if(existingUser){
            const matchPassword = await bcrypt.compare(password,existingUser.password);
            if(!matchPassword){
                return res.status(400).json({message:"Password did not match"});
            }
            const token = jwt.sign({email:existingUser.email,id: existingUser._id}, SECRET_KEY);
            res.status(201).json({user:existingUser, token : token});
    }
    else{
        res.status(400).json({message:"User is not regitered"});
    }
}
catch(error){
    console.log(error);
    res.status("500").json({message:"Internal Server Error"});
}

}

module.exports = {signin,signup}