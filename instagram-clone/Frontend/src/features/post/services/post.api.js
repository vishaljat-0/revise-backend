import axios from "axios";
const api = axios.create({
     baseURL: "http://localhost:3000/api/",
  withCredentials: true,
})


 export const getFeed= async (req,res)=>{ 
    const data = await api.get("/posts/get-feed");
      return data.data

}
export const createPost= async (imageFile,caption)=>{
   const formdata = new FormData()
   formdata.append("imageUrl",imageFile)
   formdata.append("caption",caption  )

    const formdatares = await api.post("/posts",formdata)
      return formdatares.data

}

export const likePost=async(postId)=>{
  console.log(postId);
  
  const data = await api.post(`/posts/like/${postId}`)
  console.log(data);
  
  return data.data
}
export const unlikePost=async(postId)=>{
  const data = await api.post(`/posts/unlike/${postId}`)
  return data.data
}


