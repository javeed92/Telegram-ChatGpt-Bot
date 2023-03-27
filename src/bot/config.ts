import { Telegraf, session } from "telegraf";
import env from "../config/environment";
import { MyContext } from "@/types/bot/customContext";

import { Mongo } from "@telegraf/session/mongodb";
import { SessionStore } from "@telegraf/session/types";
import { generateCommandsArray } from "@/utils/generateCommandsArray";
import generateDefaultSession from "@/utils/generateDefaultSession";

import { limit } from "@grammyjs/ratelimiter";
import { RedisType } from "@grammyjs/ratelimiter/out/typesAndDefaults";

export const rateMiddleware = limit<MyContext, RedisType>({
  timeFrame: 5000, // will be adjusted on production
  limit: 2,
  storageClient: "MEMORY_STORE",
  onLimitExceeded: (ctx) => {
    ctx.sendMessage("Please refrain from sending too many requests!");
  },
  keyGenerator: (ctx) => {
    return ctx.from?.id.toString();
  },
});

const store: SessionStore<object> = Mongo({
  url: env.MONGO_CONNECTION_URL,
});

const defaultSession = generateDefaultSession;

export const customSession = session({store, defaultSession})

const bot = new Telegraf<MyContext>(env.TELEGRAM_TOKEN, {
  telegram: { webhookReply: false },
});

bot.telegram.setMyCommands(generateCommandsArray(), {
  scope: { type: "all_private_chats" },
});

export default bot;
