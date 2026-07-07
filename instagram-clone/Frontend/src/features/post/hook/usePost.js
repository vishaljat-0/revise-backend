import { useContext } from "react";
import { getFeed } from "../services/post.api";
import { PostContext } from "../store/post.context";

export const usePost=()=>{
    const context = useContext(PostContext);

    const { loading, setloading,post, setpost,feed, setfeed } = context;
     const  handleGetFeed=async()=>{
        setloading(true)
        const data= await getFeed();
        setfeed(data.data)
        setloading(false)
     }
return {loading, post, feed, handleGetFeed}
}