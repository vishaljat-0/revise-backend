import React from "react";
import { usePost } from "../hook/usePost";


function Post({ user, post,loading,handleLikePost,handleUnlikePost }) {
  
  
  return (
    <>
      <div className="post">
        <div className="user">
          <div className="img-wrap">
            <img src={user?.profilePic} alt="profileImg" />
          </div>
          <p>{user?.username}</p>
        </div>
        <img src={post?.imgUrl} alt="" />
        <div className="bottom">
          <div className="icons">
           
        <span>
  <i 
    className={
      post.isliked
        ? "ri-heart-fill like"
        : "ri-heart-line"
    }
    onClick={()=>{post.isliked ? handleUnlikePost(post._id):handleLikePost(post._id)}}
  ></i>
</span>
         
            <span >
              <i className="ri-chat-3-line"></i>
            </span>
            <span>
              <i className="ri-send-plane-line"></i>
            </span>
          </div>
          <p className="caption">{post?.caption}</p>
        </div>
      </div>
    </>
  );
}

export default Post;
