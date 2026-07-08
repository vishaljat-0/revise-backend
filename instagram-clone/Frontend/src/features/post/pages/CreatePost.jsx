import React, { useRef, useState } from "react";
import "../style/CreatePost.scss";
import { usePost } from "../hook/usePost";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const imageref = useRef(null);
  const [caption, setcaption] = useState("");
  const { loading ,handleCreatePost } = usePost();
  const navigate = useNavigate();

  const onsubmit = async(e) => {

    e.preventDefault();
    const file =imageref.current.files[0];
    console.log(file);
     await handleCreatePost(file,caption);
     navigate('/')
  }

  if(loading){
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    );
  }
  return (
    <div className="create-post">
      <div className="post-card">
        <h2>Create Post</h2>

        <form  onSubmit={(e)=> onsubmit(e)}>
          <div className="image-box">
            <label htmlFor="image">
              📷 Choose Image
            </label>
            <input  ref={imageref} type="file" hidden id="image" accept="image/*" />
          </div>

          <input
            onInput={(e) => setcaption(e.target.value)}
            value={caption}
            type="text"
            placeholder="Write an amazing caption..."
          />

          <button>Create Post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
