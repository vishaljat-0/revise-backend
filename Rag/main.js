import dotenv from "dotenv";
dotenv.config();
console.log("Rag started");
import { PDFParse } from "pdf-parse";
import fs from "fs";
import { Pinecone } from "@pinecone-database/pinecone";
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API,
});
const index = pc.index("rag-index");

let databuffer = fs.readFileSync("./JS_Interview_Prep_Vishal.pdf");
const parser = new PDFParse({ data: databuffer });
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { env } from "@mistralai/mistralai/lib/env.js";
import { config } from "process";
import { configDotenv } from "dotenv";
import { log } from "console";

const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
  apiKey: process.env.MISTRAL_API_KEY,
});

const result = await parser.getText();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 0,
});

const chunktexts = await splitter.splitText(result.text);

const vectors = await embeddings.embedDocuments(chunktexts);

const pineconeVectors = chunktexts.map((text, index) => ({
  id: `chunk-${index}`,
  values: vectors[index],
  metadata: {
    text,
  },
}));

await index.upsert(pineconeVectors);