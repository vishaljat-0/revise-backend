import axios from "axios";
const base = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export const register = async ({
  fullName,
  email,
  contact,
  password,
  isSeller,
}) => {
  const response = await base.post("/register", {
    fullName,
    email,
    contact,
    password,
    isSeller,
  });

  return response.data;
};

export const login = async ({ email, password }) => {
  const response = await base.post("/login", {
    email,
    password,
  });
  return response.data;
};
