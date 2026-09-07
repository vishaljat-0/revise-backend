import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../feature/auth/pages/Register.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="text-white">hello</h1>} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRouter;
