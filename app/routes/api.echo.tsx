import { serve } from "@novu/echo/remix";
import { echo } from "~/echo/client";

const handler = serve({
    client: echo,
  });
  
export { handler as action, handler as loader };
