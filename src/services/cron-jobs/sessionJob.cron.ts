import cron from "node-cron";
import { updateSessions } from "../database/session.service";
import logger from "@/config/logger";
import bot from "@/bot";
import environment from "@/config/environment";
import { botSubscriptionsLimitConfig } from "@/bot/config/defaults.config";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";

// EVERY DAY
cron.schedule("0 0 * * *", async () => {
  // Iterate over all the user sessions and reset the daily message counts for each user
  logger.info(
    "**********CRON IS STARTED ( Messages and Voice reset )**********"
  );

  await updateSessions(
    {},
    { $set: { "session.messagesCount": 0, "session.voiceCount": 0 } }
  );

  bot.telegram.sendMessage(
    environment.ERROR_REPORT_CHAT_ID,
    "Cron - updating message limits"
  );

  logger.info(
    "**********CRON IS FINISHED ( Messages and Voice reset )**********"
  );
});

// At minute 0 past every hour.
cron.schedule("0 */1 * * *", async () => {
  // Get the current date
  logger.info("**********CRON IS STARTED ( Images reset )**********");
  const now = new Date();

  // Update sessions where the imagesResetDate has passed
  const updateInfo = await updateSessions(
    {
      "session.imagesResetDate": { $lte: now },
    },
    [
      {
        $set: {
          "session.imagesCount": 0,
          "session.imagesResetDate": {
            $dateAdd: {
              startDate: "$session.imagesResetDate",
              unit: "month",
              amount: 1,
            },
          },
        },
      },
    ]
  );

  logger.info("**********CRON IS FINISHED ( Images reset )**********");

  // Notify dev about updates
  bot.telegram.sendMessage(
    environment.ERROR_REPORT_CHAT_ID,
    `Cron - updating image limits
${JSON.stringify(updateInfo, null, 2)}`
  );
});

/** TODO */
/** CRON JOB TO CANCEL Premium subs when period ends */
// At minute 0 past every hour.
cron.schedule("0 */1 * * *", async () => {
  // Get the current date
  logger.info("**********CRON IS STARTED ( Premium Reset )**********");
  const now = new Date();

  // Update sessions where the premiumEndDate has passed
  const updateInfo = await updateSessions(
    {
      "session.premiumEndDate": { $lte: now },
    },
    [
      {
        $set: {
          "session.maxDailyMessages":
            botSubscriptionsLimitConfig.Free.DAILY_MESSAGES_LIMIT,
          "session.maxDailyVoices":
            botSubscriptionsLimitConfig.Free.DAILY_VOICES_LIMIT,
          "session.maxMonthlyImages":
            botSubscriptionsLimitConfig.Free.MONTHLY_IMAGES_LIMIT,
          subscription: BotSubscription.FREE,
          "session.imagesCount": 0,
          "session.messagesCount": 0,
          "session.voiceCount": 0,
        },
      },
    ]
  );

  logger.info("**********CRON IS FINISHED ( Premium Reset )**********");

  // Notify dev about updates
  bot.telegram.sendMessage(
    environment.ERROR_REPORT_CHAT_ID,
    `Cron - canceling premium subs
${JSON.stringify(updateInfo, null, 2)}`
  );
});
