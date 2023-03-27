import cron from "node-cron";
import { updateSessions } from "../database/session";
import logger from "@/config/logger";

cron.schedule("0 0 * * *", async () => {
  // Iterate over all the user sessions and reset the daily message counts for each user
  logger.info("**********CRON IS STARTED ( Messages reset )**********");
  await updateSessions(
    { "session.subscription": "Free" },
    { $set: { "session.messagesCount": 0 } }
  );
  logger.info("**********CRON IS FINISHED**********");
});

cron.schedule("0 */6 * * *", async () => {
  // Get the current date
  logger.info("**********CRON IS STARTED ( Images reset )**********");
  const now = new Date();

  // Update sessions where the imagesResetDate has passed
  await updateSessions(
    {
      "session.subscription": "Free",
      "session.imagesResetDate": { $lte: now },
    },
    {
      $set: { "sessionData.imagesCount": 0 },
    }
  );
  logger.info("**********CRON IS STARTED**********");
});
