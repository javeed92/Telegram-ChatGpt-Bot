import bot, { store } from "./config";
import startComposer from "./commands";
import onComposer from "./on";
import { session } from "telegraf";

bot.use(session({ store }));

bot.use(startComposer);
bot.use(onComposer);

export default bot;
