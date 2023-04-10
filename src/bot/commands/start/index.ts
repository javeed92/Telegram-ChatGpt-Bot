import { MyContext } from "@/types/bot/customContext";
import {
  helpCommandResponse,
  startResponse,
} from "@/bot/helpers/texts/commandResponse.texts";
import { utilityKeyboard } from "@/bot/helpers/markups/keyboard.markup";

export const startHandler = async (ctx: MyContext) => {
  try {
    if (ctx.has("message")) {
      await ctx.reply(
        startResponse(
          ctx.message?.from.username ||
            ctx.message?.from.first_name ||
            ctx.message?.from.last_name ||
            "friend"
        ),
        utilityKeyboard()
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
