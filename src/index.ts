import express from "express";
import { config } from "dotenv";
config();
import env from "@/config/environment";
import bot from "@/bot";
import { connectToDbServer } from "@/config/database";
import logger from "@/config/logger";

const app = express();

const startTheApp = async () => {
  app.use(await bot.createWebhook({ domain: env.WEBHOOK_DOMAIN, drop_pending_updates: true }));

  await connectToDbServer();

  app.listen(env.PORTE, async () => {
    logger.debug(`Listening on port ${env.PORTE}`);
    const webhookInfo = await bot.telegram.getWebhookInfo();
    logger.debug({ webhookInfo });
    // if (webhookInfo.url) {
    //   await bot.telegram.deleteWebhook({ drop_pending_updates: true });
    // }

  });
};

startTheApp();
