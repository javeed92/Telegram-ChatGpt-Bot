import environment from "@/config/environment";
import logger from "@/config/logger";
import { MyContext } from "@/types/bot/customContext";

export const errorHandler = async (err: any, ctx: MyContext) => {
  try {
    logger.error(err);
    if (ctx.message) {
      await ctx.telegram.sendMessage(
        environment.ERROR_REPORT_CHAT_ID,
        `${ctx.update.update_id} - ${ctx.message?.from?.id} - ${ctx.message?.from?.username} - Error: ${err.message}`
      );
    }
  } catch (error) {
    throw error;
  }
};
