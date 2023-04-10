import { PremiumSubscriptionPricesMonthly } from "@/bot/config/defaults.config";
import { Markup } from "telegraf";

export const premiumCommandMarkup = () => {
  const inlineKeyboardArr = [];

  for (const month in PremiumSubscriptionPricesMonthly) {
    const callbackButton = Markup.button.callback(
      `${month} month(s): ${
        PremiumSubscriptionPricesMonthly[
          month as keyof typeof PremiumSubscriptionPricesMonthly
        ]
      }`,
      `premium ${month}`
    );

    inlineKeyboardArr.push([callbackButton]);
  }

  return Markup.inlineKeyboard(inlineKeyboardArr);
};


export const forceReplyOptions = () => {
  return Markup.forceReply()
}