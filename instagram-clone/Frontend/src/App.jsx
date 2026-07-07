import React from "react";
import "./style.scss";
import { BrowserRouter } from "react-router-dom";
import Approutes from "./Approute";
import { AuthProvider } from "./features/auth/store/auth.context";
import { PostContextProvider } from "./features/post/store/post.context.jsx";

function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <Approutes />
      </PostContextProvider>
    </AuthProvider>
  );
}

export default App;
