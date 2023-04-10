import environment from "@/config/environment";
import { MyContext } from "@/types/bot/customContext";
import { accessDeniedResponseText } from "../helpers/texts/memberNotifucation.text";

export async function whiteListMiddleware(
  ctx: MyContext,
  next: () => Promise<void>
) {
  try {
    if (process.env.NODE_ENV === "development") {
      const whileListChatIds = environment.WHITE_LIST_CHAT_IDs.split(",").map(
        (id) => parseInt(id)
      );
      for (const id of whileListChatIds) {
        if (ctx.chat?.id === id) return await next();
      }
      return await ctx.sendMessage(accessDeniedResponseText)
    }

    return await next()
  } catch (error) {
    throw error;
  }
}
