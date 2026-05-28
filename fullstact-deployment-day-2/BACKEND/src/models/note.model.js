const mongoose= require("mongoose")


const noteSchema= new mongoose.Schema({
    title:String,
    description : String
})


const notModel= new mongoose.model("note", noteSchema)


module.exports= notModel