const mongoose = require("mongoose");
const blockListScehma = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const blackListModel = mongoose.model("blacklist", blockListScehma);
module.exports = blackListModel;
