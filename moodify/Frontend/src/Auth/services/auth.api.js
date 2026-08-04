import axios from "axios";
import { useEffect } from "react";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const register = async ({ username, email, password }) => {
    console.log(username,email,password);
    
  const response = await api.post("/api/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const login = async ({ username  ,email, password }) => {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data;
};

export const getme = async () => {
  const response = await api.get("/api/auth/get-me");
  return response.data;
};


export const logout = async () => {
    const response = await api.get("/api/auth/logout");
    return response.data;
}
