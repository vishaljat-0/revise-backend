import axios from "axios";
const base = axios.create({
  baseURL: 'http://localhost:3000/auth',
  withCredentials: true,
});

 export const  register = async ({
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
