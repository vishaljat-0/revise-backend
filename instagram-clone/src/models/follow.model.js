const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      ref: "user",
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Follower is required"],
    },
    following: {
      ref: "user",
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Following is required"],
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "accepted", "rejected"],
        message: "status can only be pending, accepted or rejected",
      },
    },
  },
  {
    timestamps: true,
  },
);
followSchema.index({ follower: 1, following: 1 }, { unique: true });
const followModel = mongoose.model("follow", followSchema);
module.exports = followModel;
