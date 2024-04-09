const noteModel = require("../models/notes");

const createNotes = async (req,res) =>{

const {title, description} = req.body;
const newNote = new noteModel({
    title:title,
    description:description,
    userId : req.userId
});

try{
await newNote.save();
res.status(201).json({status:"Note Created Successfully",newNote});
}catch(error){
console.log(error);
res.status(500).json({status:"Internal Server Error"});
}

}

const updateNotes = async (req,res) =>{
    const id = req.params.id;
    const {title, description} = req.body;

    const newNote = {
        title:title,
        description:description,
        userId : req.userId
    }
    try {
        await noteModel.findByIdAndUpdate(id,newNote,{new : true});
        res.status(200).json({status:"Note Updated Successfully",newNote});
    } catch (error) {
        console.log(error);
        res.status(500).json({status:"Internal Server Error"});
    }
    
}
const deleteNotes = async (req,res) =>{
    const id = req.params.id;
    try{
        const note = await noteModel.findByIdAndDelete(id);
        res.status(202).json({status:"Note Deleted Successfully",note});

    }catch(error){
        console.log(error);
        res.status(500).json({status:"Internal Server Error"});
    }
}
const getNotes = async (req,res) =>{
    try{
        const notes = await noteModel.find({userId : req.userId});
        res.status(200).json(notes);
    }catch(error){
        console.log(error);
        res.status(500).json({status:"Internal Server Error"});
    }
    
}

module.exports = {
    createNotes,
    updateNotes,
    deleteNotes,
    getNotes
}