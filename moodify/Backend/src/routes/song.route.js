const express = require("express");
const upload = require("../middleware/songUpload.middleware");
const { songController, getSongController } = require("../contollers/Song.controller");
const songRouter = express.Router()


songRouter.post("/", upload.single("song"), songController);
songRouter.get("/getSong",getSongController)


module.exports=songRouter