const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique:[true,"Username already exists"],
      trim: true,
    },

  

    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    bio: {
      type: String,
      default: "",
    },

    profilePic: {
      type: String,
      default: "https://ik.imagekit.io/cerbsd0t6/insta_clone/default-avatar-profile-icon-of-social-media-user-photo-image-vector.webp",
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);



 const userModel = mongoose.model("User", userSchema);
module.exports =  userModel