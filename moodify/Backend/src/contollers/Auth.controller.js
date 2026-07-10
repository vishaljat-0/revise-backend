const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListModel = require("../model/blacklistModel");
const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const isUserExists = await userModel.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (isUserExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
  });

  const token = await jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET_KEY,
  );
  res.cookie("token", token, { httpOnly: true });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
    token,
  });
};

const loginController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const user = await userModel
    .findOne({
      $or: [{ email: email }, { username: username }],
    })
    .select("+password");
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid password",
    });
  }

  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  res.cookie("token", token, { httpOnly: true });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
    token,
  });
};

const getMeController = async (req, res) => {
  const userId = req.user.id;
  const user = await userModel.findById(userId);

  res.status(200).json({ success: true, user });
};

 const logoutController=async(req,res)=>{
  const token = req.cookies.token
  res.clearCookie("token");
  const blackListToken = await blackListModel.create({token})
  res.status(200).json({success:true,message:"User logged out successfully"});

    
 }
module.exports = { registerController, loginController, getMeController,logoutController };
