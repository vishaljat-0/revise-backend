import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getme = async ({ mood }) => {
  const response = await api.get("/api/song/getSong?mood=" + mood);
  return response.data;
};
