const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
postId:{
    ref:"post",
    type:mongoose.Schema.Types.ObjectId,
    required:[true,"Post is required"]
},
user:{
    ref:"user",
    type:mongoose.Schema.Types.ObjectId,
    required:[true,"User is required"]
},

},
{
    timestamps: true
})
likeSchema.index({ postId: 1, user: 1 }, { unique: true });

const likeModel=mongoose.model("like",likeSchema)
module.exports=likeModel