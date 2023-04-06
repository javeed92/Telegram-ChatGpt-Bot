import { Composer } from "telegraf";
import { MyContext } from "@/types/bot/customContext";
import { voiceToImageTextPrompt } from "../helpers/texts/commandResponse.texts";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";

const composer = new Composer<MyContext>();

composer.hears("📸 Voice to image", async (ctx) => {
  try {
    console.log(ctx.update);
    if(ctx.session.subscription === BotSubscription.FREE){
        return await ctx.sendMessage('Try /premium to unclock this feature')
    }
    await ctx.reply(voiceToImageTextPrompt, {
      reply_markup: { force_reply: true },
    });
  } catch (error) {
    throw error;
  }
});
composer.hears("💵 Donation", async (ctx) => {});
composer.hears("✅ Premium Subscription", async (ctx) => {});
composer.hears("📞 Feedback", async (ctx) => {});

export default composer;
