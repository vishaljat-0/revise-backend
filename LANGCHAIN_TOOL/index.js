import { configDotenv } from "dotenv";
import readline from "readline/promises";
import nodemailer from "nodemailer";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import * as z from "zod"
import { tool } from "@langchain/core/tools";
import { createAgent } from "langchain";
configDotenv();
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientId: process.env.GOOGLE_CLIENT_ID,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

try {
  await transporter.verify();
  console.log("Server is ready to take our messages");
} catch (err) {
  console.error("Verification failed:", err);
}

const sendemail = async ({ to, subject, text }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.GOOGLE_USER,
      to: to,
      subject: subject,
      text: text,
    });
  return `Email sent successfully to  : ${to}`;
  } catch (error) {
    console.log(error);
  }
};

const emailTool=tool(
  async ({to,subject,text})=>
  {
return await sendemail({to,subject,text})
  },{
name:"send_email",
description:"send an email",
schema:z.object({
  to:z.string(),
  subject:z.string(),
  text:z.string()
})
  }
)
  
const history = [];

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});
 const agent =createAgent({
  model,
  tools:[emailTool],
  agentType:"chat",
 })

while (true) {
  const message = await rl.question("Ask: ");
  history.push(new HumanMessage(message));
  const response = await agent.invoke({messages:history});
  const aiMessage = response.messages[response.messages.length - 1]
  console.log(aiMessage.content);
  
  history.push(new AIMessage(aiMessage.content));
}
x``