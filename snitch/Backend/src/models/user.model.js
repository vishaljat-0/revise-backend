import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
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
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["seller", "buyer"],
    default: "buyer",
  },
});

userSchema.pre("save",async function(){
   if (!this.isModified("password")) return;
  
const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

const userModel = mongoose.model("user", userSchema);


export default userModel;
