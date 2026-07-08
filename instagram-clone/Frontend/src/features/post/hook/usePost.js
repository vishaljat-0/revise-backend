import { useContext, useEffect } from "react";
import { createPost, getFeed, likePost, unlikePost } from "../services/post.api";
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


     const handleCreatePost=async(imageFile,caption)=>{
      console.log(imageFile,caption)
        setloading(true)
        const data= await createPost(imageFile,caption);
        console.log(data)
        setfeed([data.data,...feed])

        setloading(false)
     }
      const handleLikePost=async(postId)=>{
       
        const data= await likePost(postId);
        handleGetFeed()
        console.log(data)
     }
     const handleUnlikePost=async(postId)=>{
        const data= await unlikePost(postId);
                handleGetFeed()

        console.log(data)
     }

// useEffect(()=>{
// handleGetFeed()
// },[])



return {loading, post, feed, handleGetFeed,handleCreatePost,handleLikePost,handleUnlikePost}
}