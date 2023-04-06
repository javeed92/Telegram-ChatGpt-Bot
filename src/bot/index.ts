import bot, { customSession, rateMiddleware } from "./config/bot.config";
import commandComposer from "./commands";
import onComposer from "./on";
import hearsComposer from "./hears";
import { errorHandler } from "./error";
import "@/services/cron-jobs/sessionJob.cron";

bot.use(customSession, rateMiddleware);

bot.use(hearsComposer)
bot.use(commandComposer);
bot.use(onComposer);

bot.catch(errorHandler);

export default bot;
