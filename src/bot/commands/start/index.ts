import { createTelegramChat } from "@/services/database/chat";
import { MyContext } from "@/types/bot/customContext";
import logger from "@/config/logger";

export const startHandler = async (ctx: MyContext) => {
  try {
    const chat = await createTelegramChat(ctx.message?.chat);

    logger.info({ chat });

    await ctx.reply("Welcome to our AI bot!");
    logger.info(ctx.session);
    ctx.session ??= {
      maxMessage: 10,
      messageCount: 0,
    };
  } catch (error) {
    throw error;
  }
};
