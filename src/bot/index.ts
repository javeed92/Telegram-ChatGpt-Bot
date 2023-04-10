import bot, { customSession, rateMiddleware } from "./config/bot.config";
import commandComposer from "./commands";
import onComposer from "./on";
import hearsComposer from "./hears";
import { errorHandler } from "./error";
import { updateLoggerMiddleware } from "./middlewares/logger.middleware";
import { whiteListMiddleware } from "./middlewares/whileList.middleware";
import "@/services/cron-jobs/sessionJob.cron";

bot.use(customSession, rateMiddleware);

bot.use(updateLoggerMiddleware, whiteListMiddleware)

bot.use(hearsComposer)
bot.use(commandComposer);
bot.use(onComposer);

bot.catch(errorHandler);

export default bot;
