import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGroq } from "@langchain/groq";

import config from "./config/config.js";
 export const model_Google = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  apiKey: config.GOOGLE_API_KEY,
});

const res = await model_Google.invoke("Hello, how are you?");

 export const model_Mistral = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: config.MISTRAL_API_KEY,
});

 export const model_Groq = new ChatGroq({
  model: "groq-medium-latest",
  apiKey: config.GROQ_API_KEY,
});
