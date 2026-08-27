import dotenv from "dotenv";
dotenv.config();

type Config = {
  GOOGLE_API_KEY: string;
  MISTRAL_API_KEY: string;
  GROQ_API_KEY: string;
};
const config: Config = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
};

export default config;
