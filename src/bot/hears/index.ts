import { Composer } from "telegraf";
import { MyContext } from "@/types/bot/customContext";
import { premiumKeyboardResponseText, voiceToImageTextPrompt } from "../helpers/texts/commandResponse.texts";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";
import {
  donationResponseText,
  feedbackResponseText,
} from "../helpers/texts/hearResponse.text";
import { forceReplyOptions } from "../helpers/markups/inlineKeyboard.markup";
import { utilityKeyboard } from "../helpers/markups/keyboard.markup";

const composer = new Composer<MyContext>();

composer.hears("📸 Voice to image", async (ctx) => {
  try {
    if (ctx.session.subscription === BotSubscription.FREE) {
      return await ctx.sendMessage("Try /premium to unclock this feature");
    }

    await ctx.reply(voiceToImageTextPrompt, forceReplyOptions());
    await ctx.sendMessage('📸', utilityKeyboard())
  } catch (error) {
    throw error;
  }
});
composer.hears("💵 Donation", async (ctx) => {
  try {
    await ctx.sendMessage(donationResponseText, forceReplyOptions());
    await ctx.sendMessage('💵', utilityKeyboard())
  } catch (error) {
    throw error;
  }
});
composer.hears("✅ Premium Subscription", async (ctx) => {
  try {
    return await ctx.sendMessage(
      premiumKeyboardResponseText()
    );
  } catch (error) {
    throw error
  }
});
composer.hears("📞 Feedback", async (ctx) => {
  try {
    await ctx.sendMessage(feedbackResponseText, forceReplyOptions());
    await ctx.sendMessage('📞', utilityKeyboard())
  } catch (error) {
    throw error;
  }
});

export default composer;
