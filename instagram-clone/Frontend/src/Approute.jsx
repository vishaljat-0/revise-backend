import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/post/pages/Feed";
import CreatePost from "./features/post/pages/CreatePost";
function Approutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed/>} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default  Approutes;
