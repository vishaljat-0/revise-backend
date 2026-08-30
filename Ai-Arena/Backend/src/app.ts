import  Express  from "express";
import runGraph from "./graphAi/graph.js"
const app= Express()
app.post("/use-graph", async (req, res) => {

  const result = await runGraph("what is currency ");
    
  res.json(result);
})
export default app