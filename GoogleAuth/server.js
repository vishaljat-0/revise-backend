import "dotenv/config";

import express from "express";
import passport from "passport";
import session from "express-session";
import jwt from "jsonwebtoken";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
const app = express();

app.use(passport.initialize());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    (req, accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);



app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
  }),
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google",{session: false}),
    
  (req, res) => {
    console.log(req);
    res.send("Google login successful");
  },
);
app.listen(3000, (req, res) => {
  console.log("server is running on port 3000");
});

