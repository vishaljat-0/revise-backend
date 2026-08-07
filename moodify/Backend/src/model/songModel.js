const mongoose = require("mongoose");
const { type } = require("../config/cache");
const songSchema = new mongoose.Schema({
    title: {
        type:String,
        require:true
    },
  Songlink: {
    type: String,
    required: true,
  },
  Songposter: {
    type: String,
    required: true,
  },
  mood:{
    type: String,
    enum: {
      values: ["happy", "Sad", "surprised"],
    },
    required: true,
  },
});

const songModel = mongoose.model("song", songSchema);
module.exports = songModel;
