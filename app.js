require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use("/users",userRouter);
app.use("/notes",noteRouter);
app.use("/",(req,res)=>{
    res.send("No Active Listener");
});


mongoose.connect("mongodb+srv://infoanandsrinet:K3jTp1HQYBdrpGGk@cluster0.k0yn5rf.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    app.listen(port,()=>{
        console.log("Server Started at port "+port);
    });
})
.catch((error)=>{
console.log(error);
});

