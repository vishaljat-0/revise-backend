import {
  StateSchema,
  START,
  END,
  type GraphNode,
  StateGraph,
} from "@langchain/langgraph";
import { mistralAI, cohereAI, groqAi } from "../aiModels/aiModels.js";
import { z } from "zod";
import { createAgent, HumanMessage, providerStrategy, toolStrategy } from "langchain";

const State = new StateSchema({
  problem: z.string().default(""),
  aiSolution_1: z.string().default(""),
  aiSolution_2: z.string().default(""),
  Judge: z.object({
    Response_1_review: z.string().default(""),
    Response_2_review: z.string().default(""),
    aiSOlution_1_score: z.number().default(0),
    aiSolution_2_score: z.number().default(0),
  }).default({
    Response_1_review: "",
    Response_2_review: "",
    aiSOlution_1_score: 0,
    aiSolution_2_score: 0,
  }),
});

const solutionNode: GraphNode<typeof State> = async (state) => {
  const [cohoreResponse, cerabrasResponse] = await Promise.all([
    cohereAI.invoke(state.problem),
    groqAi.invoke(state.problem),
  ]);

  return {
    problem: state.problem,
    aiSolution_1: cohoreResponse.text,
    aiSolution_2: cerabrasResponse.text,
    Judge: state.Judge,
  };
};
const JudgeNode: GraphNode<typeof State> = async (state) => {
  const { problem, aiSolution_1, aiSolution_2 } = state;

  const judge = createAgent({
    model: mistralAI,
    responseFormat: toolStrategy(
      z.object({
        aiSOlution_1_score: z.number().min(0).max(10),
        aiSolution_2_score: z.number().min(0).max(10),
        Response_1_review: z.string(),
        Response_2_review: z.string(),
      }),
    ),
    systemPrompt: `you are judge for a problem ${problem} you will give a score between 0 and 10 for each solution by diffrent model  and a review for each solution`,
  });
  const judgeresponse = await judge.invoke({
    messages: [
      new HumanMessage(`
        problem: ${problem}
        aiSolution_1: ${aiSolution_1}
        aiSolution_2: ${aiSolution_2}
        `),
    ],
  });
  const {
    aiSOlution_1_score,
    aiSolution_2_score,
    Response_1_review,
    Response_2_review,
  } = judgeresponse.structuredResponse;

  return {
    Judge: {
      aiSOlution_1_score,
      aiSolution_2_score,
      Response_1_review,
      Response_2_review,
    },
  };
};

const graph = new StateGraph(State)
  .addNode("solutionNode", solutionNode)
  .addNode("Judge_", JudgeNode)
  .addEdge(START, "solutionNode")
  .addEdge("solutionNode", "Judge_")
  .addEdge("Judge_", END)
  .compile();


export default async function runGraph(problem: string) {
  const result = await graph.invoke({ problem });
  return result;
}