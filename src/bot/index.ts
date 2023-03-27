import bot, { customSession, rateMiddleware } from "./config";
import startComposer from "./commands";
import onComposer from "./on";
import { errorHandler } from "./error";
import "@/services/cron-jobs/sessionJob.cron";

bot.use(customSession, rateMiddleware, async (ctx, next) => {console.log(ctx.session); await next()});

bot.use(startComposer);
bot.use(onComposer);

bot.catch(errorHandler);

export default bot;
