import { Composer } from "telegraf";
import { callbackQuery, message } from "telegraf/filters";
import { MyContext } from "@/types/bot/customContext";
import { PremiumSubscriptionPricesMonthly } from "@/bot/config/defaults.config";
import { createInvoice } from "@/bot/helpers/texts/invoice";
import { InvoiceReplyOptions } from "@/bot/helpers/markups/invoiceOptions";

const composer = new Composer<MyContext>();

composer.action(/t-checkout\s.*/, async (ctx, next) => {
  if (ctx.has(callbackQuery("data"))) {
    await ctx.answerCbQuery();
    const data = ctx.callbackQuery.data.split(" ")[1];
    ctx.session!.currentTopic = data;
    return await ctx.sendMessage(`Checked out: ${data}`);
  }
});

composer.action(/t-delete\s.*/, async (ctx, next) => {
  if (ctx.has(callbackQuery("data"))) {
    await ctx.answerCbQuery();
    const data = ctx.callbackQuery.data.split(" ")[1];
    ctx.session.currentTopic =
      ctx.session.currentTopic === data
        ? "default_topic"
        : ctx.session.currentTopic;
    ctx.session.topics = ctx.session.topics.filter((topic) => topic !== data);
    return await ctx.sendMessage(`Topic: ${data}, deleted`);
  }
});

composer.action(/premium\s.*/, async (ctx) => {
  try {
    if (ctx.has(callbackQuery("data"))) {
      console.dir(ctx.update, { depth: Infinity });

      const forMonth = ctx.callbackQuery.data.split(" ")[1];

      await ctx.answerCbQuery(
        `You're about to pay ${
          PremiumSubscriptionPricesMonthly[
            forMonth as keyof typeof PremiumSubscriptionPricesMonthly
          ]
        } for ${forMonth} month!`,
        { show_alert: true }
      );

      await ctx.sendInvoice(createInvoice(forMonth));
    }
  } catch (error) {
    throw error;
  }
});

export default composer;
