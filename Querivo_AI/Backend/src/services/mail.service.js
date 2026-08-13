import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});
console.log(transporter)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

 export const sendEmail = async ({ to, subject, text, html }) => {
  try {
        console.log("Email data:", {
      to,
      subject,
    });

    const mailData = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      text,
      html,
    };
    const info= await transporter.sendMail(mailData);
    
    console.log(`email send to ${to}`);

    
  } catch (error) {
    console.log("Error sending email:", error);
  }
};
