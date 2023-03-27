import { Composer } from "telegraf";
import { callbackQuery } from "telegraf/filters";
import { MyContext } from "@/types/bot/customContext";

const composer = new Composer<MyContext>();

composer.on(callbackQuery("data"), async (ctx, next) => {
  const regex = /t-checkout\s.*/;

  const isCheckoutCallback = regex.test(ctx.callbackQuery.data);

  if (isCheckoutCallback) {
    await ctx.answerCbQuery();
    const data = ctx.callbackQuery.data.split(" ")[1];
    ctx.session!.currentTopic = data;
    return await ctx.sendMessage(`Checked out: ${data}`);
  }

  await next();
});

composer.on(callbackQuery("data"), async (ctx, next) => {
  const regex = /t-delete\s.*/;

  const isCheckoutCallback = regex.test(ctx.callbackQuery.data);

  if (isCheckoutCallback) {
    await ctx.answerCbQuery();
    const data = ctx.callbackQuery.data.split(" ")[1];
    ctx.session!.currentTopic =
      ctx.session?.currentTopic === data
        ? "default_topic"
        : ctx.session!.currentTopic;
    ctx.session!.topics = ctx.session!.topics.filter((topic) => topic !== data);
    return await ctx.sendMessage(`Topic: ${data}, deleted`);
  }
});

export default composer;
