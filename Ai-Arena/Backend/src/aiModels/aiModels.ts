import config from "../config/config.js";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGroq } from "@langchain/groq";
import { ChatCohere } from "@langchain/cohere"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";



// export const mistralAI = new ChatMistralAI({
//   model: "mistral-small-latest", apiKey: config.MISTRAL_API_KEY || "",
// });


export const geminiAI = new ChatGoogleGenerativeAI({
  model: "gemini-3.6-flash",
  apiKey: config.GEMINI_API_KEY || ""
});


export const groqAi = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: config.GROQ_API_KEY || "",
});

export const cohereAI = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: config.COHORE_API_KEY || "",
});