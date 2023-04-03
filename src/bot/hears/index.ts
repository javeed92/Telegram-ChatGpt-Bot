import { Composer } from "telegraf";
import { MyContext } from "@/types/bot/customContext";
import { voiceToImageTextPrompt } from "../helpers/texts/commandResponse.texts";

const composer = new Composer<MyContext>();

composer.hears('📸 Voice to image', async (ctx) => {
    try {
        console.log(ctx.update)
        await ctx.reply(voiceToImageTextPrompt, {reply_markup:{force_reply:true}})
    } catch (error) {
        throw error
    }
});
composer.hears('💵 Donation', async (ctx) => {
 
});
composer.hears('✅ Premium Subscription', async (ctx) => {
 
});
composer.hears('📞 Feedback', async (ctx) => {
 
});



export default composer;
