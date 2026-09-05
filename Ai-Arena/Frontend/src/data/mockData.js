
import axios from "axios";

export const ApiCalling = async (prompt) => {
  const response = await axios.post("http://localhost:3000/use-graph",{
    question: prompt
  })
  return response;
};
