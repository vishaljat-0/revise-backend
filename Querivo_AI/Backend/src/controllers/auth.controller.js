import User from "../models/User.js";
import jwt from "jsonwebtoken"
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


   const emailVerificationToken = jwt.sign({
    email: user.email,
    id: user._id
   },process.env.JWT_SECRET_KEY);

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
        href=${emailVerificationToken}
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

      <p>Thanks,<br>My App Team</p>
    </div>
  `,
}); 

res.status(200).json({success:true,message:"User created successfully"})
  } catch (error) {
    next(error);
  }
};
