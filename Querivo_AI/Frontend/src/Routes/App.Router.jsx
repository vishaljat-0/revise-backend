import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Feature/Auth/Pages/Login";
import Register from "../Feature/Auth/Pages/Register";
import Protected from "./Protected";
import Dashboard from "../Feature/Chat/pages/Dashboard";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Protected/>} >
       
      <Route path="/dashboard" element={<Dashboard />} />
      
      </Route>

    </Routes>
  );
};

export default AppRouter;
