import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../services/mail.service.js";

export const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const isUserExist = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (isUserExist) {
      const error = new Error("User already exist");
      error.statusCode = 400;
      return next(error);
    }
    const user = await User.create({
      username,
      email,
      password,
    });

    const emailVerificationToken = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
    );

    await sendEmail({
      to: user.email,
      subject: "Welcome to QuerivoAI 🎉",

      text: `Hello ${user.username}, welcome to QuerivoAI`,

      html: `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Welcome, ${user.username}! 👋</h2>

      <p>
        Thanks for creating your account with My App.
      </p>

      <a 
        href="http://localhost:3000/api/auth/email-verify/?token=${emailVerificationToken}"
        style="
          display: inline-block;
          padding: 10px 20px;
          background: #2563eb;
          color: white;
          text-decoration: none;
          border-radius: 6px;
        "
      >
       Click to verify
      </a>

      <p>Thanks,<br>QuerivoAI Team</p>
    </div>
  `,
    });

    res
      .status(200)
      .json({ success: true, message: "User created successfully" ,user})
      ;
  } catch (error) {
    next(error);
  }
};

export const emailVerificationController = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      const error = new Error("Token not found");
      error.statusCode = 400;
      return next(error);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({
      email: decoded.email,
    });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    if (user.isVerified) {
      const error = new Error("User already verified");
      error.statusCode = 400;
      return next(error);
    }

    user.isVerified = true;
    await user.save();

    res.send(`
         <h1>Email Verified Successfully ✅</h1>
         <p>Welcome ${user.username}</p>
      `);
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!email && !username) {
  const error = new Error("Email or username is required");
  error.statusCode = 400;
  return next(error);
}

if (!password) {
  const error = new Error("Password is required");
  error.statusCode = 400;
  return next(error);
}



    const user = await User.findOne({
      $or: [{ email }, { username }],
    }).select("+password");





    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    if (!user.isVerified) {
      const error = new Error("User not verified");
      error.statusCode = 400;
      return next(error);
    } const isMatch = await bcrypt.compare(
  password,
  user.password
);

if (!isMatch) {
  const error = new Error("Invalid credentials");
  error.statusCode = 401;
  return next(error);
}

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ success: true, message: "User logged in successfully" , user:{
        id:user._id,
        username:user.username,
        email:user.email

      }});
  } catch (error) {
    next(error);
  }
};

export const getMeController=async(req,res,next)=>{
  try {
   const id = req.user.id
   console.log(id)

    const user = await User.findById(id)
    if(!user){
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({success:true,user})

  } catch (error) {
    next(error);
  }
}
