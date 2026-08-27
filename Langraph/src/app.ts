import express from "express"
import usegraph from './graph.ai.js'

const app = express();

app.post('/use-graph', async (req,res)=>{
    await usegraph("Hello, how are you?")
})

export default app