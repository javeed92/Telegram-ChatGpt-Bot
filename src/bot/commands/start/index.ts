import { createTelegramChat } from "@/services/database/chat.service";
import { MyContext } from "@/types/bot/customContext";
import logger from "@/config/logger";
import {
  helpCommandResponse,
  startResponse,
} from "@/bot/helpers/texts/commandResponse.texts";
import { startupKeyboard } from "@/bot/helpers/markups/keyboard.markup";

export const startHandler = async (ctx: MyContext) => {
  try {
    if (ctx.has("message")) {
      const chat = await createTelegramChat(ctx.message.chat);

      logger.info({ chat, ses: ctx.session });

      await ctx.reply(
        startResponse(
          ctx.message?.from.username ||
            ctx.message?.from.first_name ||
            ctx.message?.from.last_name ||
            "friend"
        ),
        startupKeyboard()
      );
    }
  } catch (error) {
    throw error;
  }
};
export const helpHandler = async (ctx: MyContext) => {
  try {
    await ctx.sendMessage(helpCommandResponse);
  } catch (error) {
    throw error;
  }
};
