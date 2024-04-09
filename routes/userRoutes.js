const express = require("express");
const { get } = require("mongoose");
const { post } = require("./userRoutes");
const { signup, signin } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.post("/signup",signup);

userRouter.post("/signin",signin);

userRouter.use((req,res)=>{
res.send("Invalid Method");
});

module.exports = userRouter;