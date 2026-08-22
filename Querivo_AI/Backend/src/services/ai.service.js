import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent } from "langchain";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";
import * as z from "zod";
import { searchWeb } from "./tavily.service.js";
import { tool } from "@langchain/core/tools";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash", // verify model name
  apiKey: process.env.GOOGLE_API_KEY,
});

const mistralmodel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(searchWeb, {
  name: "searchWeb",
  description:
    "Search the internet for recent and factual information.",
  schema: z.object({
    query: z.string(),
  }),
});

const agent = createAgent({
  model: mistralmodel,
  tools: [searchInternetTool],
});

export const GetMessageResponse = async (messages) => {
  const chatHistory = [
    new SystemMessage(`
     You are a helpful assistant.

Formatting Rules:
- Use short paragraphs.
- Use bullet points for lists.
- Use numbered steps for instructions.
- Use markdown headings when needed.
- Use code blocks for code.
- Avoid walls of text.
    `),

    ...messages.map((msg) =>
      msg.role === "user"
        ? new HumanMessage(msg.content)
        : new AIMessage(msg.content)
    ),
  ];

  const response = await agent.invoke({
    messages: chatHistory,
  });
 const aiMessage =
  response.messages[response.messages.length - 1];

return aiMessage;
};

export const generateChatTitle = async (message) => {
  const response = await mistralmodel.invoke([
    new SystemMessage(`
      You generate chat titles.

      Rules:
      - 2 to 4 words
      - No quotes
      - No punctuation
      - Return only the title
    `),

    new HumanMessage(message),
  ]);

  return response;
};