const { json } = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  const { username, email, password, bio, profilePic } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashedpassword,
      bio,
      profilePic,
    });
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
    });
    const userWithoutPassword = await userModel.findById(user._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const loginController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if ((!email && !username) || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await userModel.findOne({
      $or: [{ email }, { username }],
    }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const ispasswordcorrect = await bcrypt.compare(password, user.password);
    if(!ispasswordcorrect){
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
    });
    const userWithoutPassword = await userModel.findById(user._id);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: userWithoutPassword,
      token,
    });

  } catch (error) {}
};
const getMeController=async(req,res)=>{
    try {
    const userId = req.user.id;
       const username = await userModel.findById(userId);

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: username
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
    }
}
module.exports = {
  registerController,
  loginController,
  getMeController,
};
