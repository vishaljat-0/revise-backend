import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../feature/auth/pages/Register.jsx";
import Login from "../feature/auth/pages/Login.jsx"

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="text-white">hello</h1>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRouter;
