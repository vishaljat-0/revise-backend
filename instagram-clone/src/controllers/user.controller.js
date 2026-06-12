const followModel = require("../models/follow.model");
const userModel = require("../models/userModel");

const followController = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.userId;
    isfollowee = await userModel.findById(followingId);
    if (!isfollowee) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (followerId === followingId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }
    const isfollowing = await followModel.findOne({
      follower: followerId,
      following: followingId,
      status:"accepted"
    });
    if (isfollowing) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user",
      });
    }
    let followRecord = await followModel.create({
      follower: followerId,
      following: followingId,
      status:"accepted"
    });
    

    await followRecord.populate([
      { path: "follower", select: "username" },
      { path: "following", select: "username" },
    ]);

    res.status(201).json({
      success: true,
      message: `Followed successfully you are following  ${followRecord.following.username}.`,
      data: followRecord,

      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

const unFollowController = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = req.params.userId;

    const isFollows = await followModel.findOne({
      follower: followerId,
      following: followingId,
      status:"accepted"
    });

    if (!isFollows) {
      return res.status(400).json({
        success: false,
        message: "You are not following this user",
      });
    }

    await followModel.findOneAndDelete({
      follower: followerId,
      following: followingId,
      status:"accepted"
    });
    

    res.status(200).json({
      success: true,
      message: "Unfollowed successfully",
      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};
module.exports = {
  followController,
  unFollowController,
};
