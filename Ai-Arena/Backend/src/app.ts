import Express from "express";
import cors from "cors"
import runGraph from "./graphAi/graph.js"
const app = Express()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(Express.json())
app.post("/use-graph", async (req, res) => {
  const question = req.body.question
  console.log(question);
  const result = await runGraph(question);

  res.json(result);
})
export default app