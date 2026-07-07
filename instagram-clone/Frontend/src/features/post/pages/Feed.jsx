import React, { useEffect } from "react";
import "../style/Feed.scss";
import Post from "../componets/Post";
import { usePost } from "../hook/usePost";

function Feed() {
  const { loading, post, feed, handleGetFeed } = usePost();
  useEffect(() => {
    handleGetFeed();
  }, []);
  if (loading || !feed) {
    return (
      <main>
        <h1 style={{ textAlign: "center" }}>Feed is Loading....</h1>
      </main>
    );
  }
  console.log(feed);

  return (
    <main className="feed-page">
      <div className="feed">
        <div className="posts">
         {feed.map(post=>{
            return <Post key={post._id} user={post.user} post={post} />
         })}
        </div>
      </div>
    </main>
  );
}

export default Feed;
