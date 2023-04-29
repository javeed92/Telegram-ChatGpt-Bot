import cron from "node-cron";
import { getAllSessions, updateSessions } from "../database/session.service";
import logger from "@/config/logger";
import bot from "@/bot";
import environment from "@/config/environment";
import { botSubscriptionsLimitConfig } from "@/bot/config/defaults.config";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";
import { sendBatches } from "@/utils/sendBatchNotifications.util";

const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds

// EVERY DAY -> Message limits
cron.schedule("0 0 * * *", async () => {
  // Iterate over all the user sessions and reset the daily message counts for each user
  logger.info(
    "**********CRON IS STARTED ( Messages and Voice reset )**********"
  );

  const updateInfo = await updateSessions(
    {},
    { $set: { "session.messagesCount": 0, "session.voiceCount": 0 } }
  );

  bot.telegram.sendMessage(
    environment.ERROR_REPORT_CHAT_ID,
    `Cron - updating message limits:
    ${JSON.stringify(updateInfo, null, 2)}`
  );

  logger.info(
    "**********CRON IS FINISHED ( Messages and Voice reset )**********"
  );
});

// EVERY DAY -> Image resetting
cron.schedule("0 0 * * *", async () => {
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
// EVERY DAY
cron.schedule("0 0 * * *", async () => {
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
          "session.subscription": BotSubscription.FREE,
          "session.imagesCount": 0,
          "session.messagesCount": 0,
          "session.voiceCount": 0,
          "session.premiumEndDate": null, // add this to unset the field
        },
        $unset: {
          "session.premiumEndDate": "", // add this to remove the field
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

/** CRON JOB TO Notify Premium subs about period ending  */
// EVERY DAY at 00:10 UTC
cron.schedule("10 0 * * *", async () => {
  // Get the current date
  logger.info("**********CRON IS STARTED ( Premium Notify )**********");
  const now = new Date();

  // Update sessions where the premiumEndDate has passed
  const sessions = await getAllSessions({
    "session.subscription": BotSubscription.PREMIUM,
    $expr: {
      $lte: [{ $subtract: ["$session.premiumEndDate", now] }, oneDay],
    },
  });

  await sendBatches(
    sessions,
    `Your premium subscription is about to expire in 1 day. 
If you want to access the premium feature prolong your subscription :)

/premium`
  );

  logger.info("**********CRON IS FINISHED ( Premium Notify )**********");

  // Notify dev about updates
  bot.telegram.sendMessage(
    environment.ERROR_REPORT_CHAT_ID,
    `Cron - notifying user about premium will end after 1 day.
${JSON.stringify({ chatCount: sessions.length }, null, 2)}`
  );
});
