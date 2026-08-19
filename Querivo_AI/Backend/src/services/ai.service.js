import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";

const model = new ChatGoogleGenerativeAI({
model: "gemini-3.6-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

const mistralmodel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export const GetMessageResponse = async (messages) => {
  const chatHistory = [
    new SystemMessage(`
      You are a helpful and precise assistant.

      Rules:
      - Answer clearly.
      - If you don't know something, say so.
      - Use previous conversation context when relevant.
    `),

    ...messages.map((msg) => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      }

      return new AIMessage(msg.content);
    }),
  ];

  const response = await model.invoke(chatHistory);

  return response;
};

export const generateChatTitle = async (message) => {
  const response = await mistralmodel.invoke([
    new SystemMessage(`
      You generate chat titles.

      Rules:
      - 2 to 4 words
      - Clear and relevant
      - No quotes
      - No punctuation
      - Return only the title
    `),

    new HumanMessage(message),
  ]);

  return response;
};
