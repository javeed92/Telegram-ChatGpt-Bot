import { Composer } from "telegraf";
import { MyContext } from "@/types/bot/customContext";
import { voiceToImageTextPrompt } from "../helpers/texts/commandResponse.texts";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";
import { donationResponseText } from "../helpers/texts/hearResponse.text";
import { forceReplyOptions } from "../helpers/markups/inlineKeyboard.markup";

const composer = new Composer<MyContext>();

composer.hears("📸 Voice to image", async (ctx) => {
  try {
    if (ctx.session.subscription === BotSubscription.FREE) {
      return await ctx.sendMessage("Try /premium to unclock this feature");
    }

    await ctx.reply(voiceToImageTextPrompt, {
      reply_markup: { force_reply: true },
    });
  } catch (error) {
    throw error;
  }
});
composer.hears("💵 Donation", async (ctx) => {
  try {
    await ctx.sendMessage(donationResponseText, forceReplyOptions())
  } catch (error) {
    throw error
  }
});
composer.hears("✅ Premium Subscription", async (ctx) => {});
composer.hears("📞 Feedback", async (ctx) => {});

export default composer;
