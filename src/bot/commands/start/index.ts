import { createTelegramChat } from "@/services/database/chat";
import { MyContext } from "@/types/bot/customContext";
import logger from "@/config/logger";
import { startResponse } from "@/bot/helpers/texts/commandResponse.texts";

export const startHandler = async (ctx: MyContext) => {
  try {
    const chat = await createTelegramChat(ctx.message?.chat);

    logger.info({ chat });

    await ctx.reply(startResponse(ctx.message?.from.username || ctx.message?.from.first_name || ctx.message?.from.last_name || 'friend'));
  } catch (error) {
    throw error;
  }
};
