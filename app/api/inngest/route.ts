import { serve } from "inngest/next";
import { inngest } from "@/app/utils/inngest/client";
import { handleJobExpiration, helloWorld } from "./functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    handleJobExpiration,
  ],
});
