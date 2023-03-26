import { Telegraf } from "telegraf";
import env from "../config/environment";
import { MyContext } from "@/types/bot/customContext";

import { Mongo } from "@telegraf/session/mongodb";
import { SessionStore } from "@telegraf/session/types";
import { generateCommandsArray } from "@/utils/generateCommandsArray";

export const store: SessionStore<object> = Mongo({
  url: env.MONGO_CONNECTION_URL,
});

const bot = new Telegraf<MyContext>(env.TELEGRAM_TOKEN);

bot.telegram.setMyCommands(
   generateCommandsArray(),
  { scope: { type: "all_private_chats" } }
);

export default bot;
