import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

async function testModel() {
  try {
    const result = await model.invoke("Hello, how are you?");
    console.log(result.content);
  } catch (error) {
    console.error(error);
  }
}

testModel();

export default testModel;