import { serve } from "inngest/next";
import { inngest } from "@/app/utils/inngest/client";
import { handleJobExpiration, helloWorld, sendPeriodicJobListings } from "./functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    handleJobExpiration,
    sendPeriodicJobListings,
  ],
});
