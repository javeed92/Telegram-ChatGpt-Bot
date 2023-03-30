import bot, { customSession, rateMiddleware } from "./config";
import commandComposer from "./commands";
import onComposer from "./on";
import { errorHandler } from "./error";
import "@/services/cron-jobs/sessionJob.cron";

bot.use(customSession, rateMiddleware);

bot.use(commandComposer);
bot.use(onComposer);

bot.catch(errorHandler);

export default bot;
