import axios from "axios";
const api = axios.create({
     baseURL: "http://localhost:3000/api/",
  withCredentials: true,
})


 export const getFeed= async (req,res)=>{ 
    const data = await api.get("/posts/get-feed");
      return data.data
      console.log(data)

}


