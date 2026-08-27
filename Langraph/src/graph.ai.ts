import {
  StateSchema,
  MessagesValue,
  type GraphNode,
  StateGraph,
  START,
  END,
  Graph,
  ReducedValue,

  
} 
from "@langchain/langgraph";
import { promise, z } from "zod";
import { model_Google, model_Groq, model_Mistral } from "./servies.models";
import { HumanMessage } from "@langchain/core/messages";
import { createAgentExecutor } from "@langchain/langgraph/prebuilt";
import { createAgent, providerStrategy } from "langchain";
const State = new StateSchema({
  messages: MessagesValue,
  solution_1: new ReducedValue(z.string().default(""), {
    reducer: (current, next) => {
      return next;
    },
  }),

  solution_2: new ReducedValue(z.string().default(""), {
    reducer: (current, next) => {
      return next;
    },
  }),
  judge_recomond: new ReducedValue(z.object().default({}), {
    reducer: (current, next) => {
      return next;
    },
  }),
});

const solutionNode: GraphNode<typeof State> = async (state) => {
  const [mistral_solution, groq_solution] = await  Promise.all([
    model_Mistral.invoke("what is js?"),
    model_Google.invoke("what is js ?"),
  ]);

  return {
    solution_1: mistral_solution.text,
    solution_2: groq_solution.text,
  };
};
const judgenode: GraphNode<typeof State> = async  (state) => {
  const { solution_1, solution_2 } = state;
const judge= createAgent({
    model:model_Mistral,
    tools:[],
    responseFormat:providerStrategy(z.object({
        solution_1_score:z.number().min(1).max(10),
        solution_2_score:z.number().min(1).max(10)
    }))
})
const judge_recomond = await judge.invoke({
   messages:[
     new HumanMessage(
        ` you are judge , compare ${solution_1} and ${solution_2} and give me the score of them and tell me which one is better according  to  both response campare which is best and give from 0 to 10 and the problem is ${state.messages[0].text}` 
    )
   ]
})
const result = judge_recomond.structuredResponse
return {
    judge_recomond: result
    
}

  
};

const graph = new StateGraph(State)
  .addNode("solution", solutionNode)
  .addNode("judge", judgenode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge")
  .addEdge("judge", END)
  .compile();

export default async function (usermessage: string) {
  const result = await graph.invoke({
    messages: [new HumanMessage(usermessage)],
  });
  return result.messages;
}
