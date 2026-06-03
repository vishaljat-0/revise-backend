const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerContoller = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({
        sucess: false,
        message: "All fields are required",
      });
    }
    // EXISTING USER
    const exitingUser = await userModel.findOne({ email });

    if (exitingUser) {
      return res.status(409).json({
        sucess: false,
        message: "Already user exist",
      });
    }
    //  HASHING password
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // GENRATING_TOKEN

    const token = jwt.sign(
      {
        id: user._id,
      },

      process.env.JWT_KEY,
    );
    // SAVE TO Cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

//  RESPONSE
const userData = await userModel
  .findById(user._id)
  .select("-password");

    res.status(201).json({
      sucess: true,
      message: "user created",
      user: userData,
    });
  } catch (error) {
      return res.status(500).json({
    success: false,
    message: error.message,
  });

  }

 
};

module.exports = {
  registerContoller,
};
