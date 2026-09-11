import mongoose from "mongoose";
import bcrypt from  "bcrypt"

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    
  },
  password: {
    type: String,
    required:function(){
      return (!this.googleId)
    }
  },
  role: {
    type: String,
    enum: ["seller", "buyer"],
    default: "buyer",
  },
  googleId:{
    type:String
    
  }
});

userSchema.pre("save",async function(){
   if (!this.isModified("password")) return;
  
const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

const userModel = mongoose.model("user", userSchema);


export default userModel;
