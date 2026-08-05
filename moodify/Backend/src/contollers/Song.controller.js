// const uploadfun= require("../services/imagekit.service")
import songModel from "../model/songModel.js"
import { uploadfun } from "../services/imagekit.service.js"
import id3 from "node-id3"
 export const songController= async(req,res)=>{
 const {mood}=req.body

  const tags = id3.read(req.file.buffer)
  const songbuffer = await req.file.buffer
  const [songfile,posterurl]=await Promise.all([
    uploadfun({
      buffer: songbuffer,
      filename:tags.title,
      folder: "cohort/songs",
    })
    ,
    uploadfun({
      buffer: tags.image.imageBuffer,
      filename: tags.title,
      folder: "cohort/posters",
    })
  ])

const songs= await songModel.create({
    title:tags.title,
  Songlink:songfile.url,
  Songposter:posterurl.url,
  mood:mood
})

res.status(200).json({success:true,song:songs})

}
 export const getSongController=async(req,res)=>{
     const {mood}=req.query
     const songs=await songModel.find({mood})
     res.status(200).json({success:true,songs})
 }