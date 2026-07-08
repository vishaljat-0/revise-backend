const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  res.cookie("token", token, { httpOnly: true });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
    token,
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const user = await userModel.findOne({  email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
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

module.exports = { registerController, loginController };
