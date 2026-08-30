import dotenv from "dotenv";

dotenv.config();

const config = {
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
GROQ_API_KEY: process.env.GROQ_API_KEY,
  COHORE_API_KEY: process.env.COHORE_API_KEY,
};


export default config;