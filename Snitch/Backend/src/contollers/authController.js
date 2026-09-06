import config from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
const genrateToken = (user, res, message) => {
  const token = jwt.sign({ id: user._id }, config.JWT_KEY, {
    expiresIn: "7d",
  });

  res.cookie("token", token);

  res.status(201).json({
    message,
    success: true,
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      contact: user.contact,
      role: user.role,
    },
  });
};
export const registerController = async (req, res) => {
  const { fullname, email, contact, password, role } = req.body;
  try {
    const isuserexist = await userModel.findOne({
      $or: [{ email }, { contact }],
    });
    if (isuserexist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const user = await userModel.create({
      fullname,
      email,
      contact,
      password,
      role,
    });

     genrateToken(user, res, "user registered successfully");
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};