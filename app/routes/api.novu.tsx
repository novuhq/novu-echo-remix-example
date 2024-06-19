import { serve } from "@novu/framework/remix";
import { client, signupWorkflow } from "~/novu/workflows";

const handler = serve({
    client: client,
    workflows: [signupWorkflow]
  });
  
export { handler as action, handler as loader };
