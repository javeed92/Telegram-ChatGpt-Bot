import cron from "node-cron";
import { updateSessions } from "../database/session";
import logger from "@/config/logger";
import bot from "@/bot";
import environment from "@/config/environment";

// EVERY DAY
cron.schedule("0 0 * * *", async () => {
  // Iterate over all the user sessions and reset the daily message counts for each user
  logger.info("**********CRON IS STARTED ( Messages reset )**********");
  await updateSessions(
    { },
    { $set: { "session.messagesCount": 0 } }
  );
  logger.info("**********CRON IS FINISHED**********");
});

// EVERY 6 HOURS
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

// for Render server
cron.schedule("*/13 * * * *", async () => {
  // Get the current date
  logger.info("**********CRON IS STARTED ( To run server )**********");

  bot.telegram.sendMessage(
    environment.ERROR_REPORT_CHAT_ID,
    "cron started to run server"
  );
  logger.info("**********CRON IS STARTED**********");
});
