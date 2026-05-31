const express = require("express");
const notModel = require("./models/note.model");
const app = express();
const cors = require("cors");
const path = require("path");
const { log } = require("console");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static("./public"))

app.post("/api/post", async (req, res) => {
  const { title, description } = req.body;
  const note = await notModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "data save",
    note,
  });
});
app.get("/api/get", async (req, res) => {
  const notes = await notModel.find();
  res.status(200).json({
    notes,
  });
});
app.delete("/api/delete/:id",async(req,res)=>{
    const id = req.params.id;
    const note = await notModel.findByIdAndDelete(id);
    res.status(200).json({
        message:"data deleted",
        note
    })
})
app.patch("/api/update/:id",async(req,res)=>{
    const id = req.params.id;
    const {description,title}=req.body
    const note = await notModel.findByIdAndUpdate(id,{description,title});
    res.status(200).json({
        message:"data updated",
        note
    })
})

console.log(__dirname);

app.use((req, res) => {
  res.sendFile(path.join(__dirname,'..', "/public/index.html"));
});
module.exports = app;
