const mongoose = require("mongoose");
const postSchema= new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true,"Post image is required"]
    },
    user:{
        ref:Users,
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"User is required"]

    }

})

const postModel=mongoose.model("post",postSchema)
module.exports=postModel