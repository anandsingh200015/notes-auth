const express = require("express");
const { getNotes, createNotes, updateNotes, deleteNotes } = require("../controllers/noteControllers");
const noteRouter = express.Router();
const auth = require("../middlewares/auth");

noteRouter.get("/",auth,getNotes);

noteRouter.post("/",auth,createNotes);

noteRouter.put("/:id",auth,updateNotes);

noteRouter.delete("/:id",auth,deleteNotes);

noteRouter.use((req,res)=>{
    res.send("Invalid Method");
    });

module.exports = noteRouter;