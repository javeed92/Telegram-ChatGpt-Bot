import { Markup } from "telegraf";

export const utilityKeyboard = () => {
  return Markup.keyboard([
    ["📸 Voice to image", "💵 Donation"], // Row1 with 2 buttons
    ["✅ Premium Subscription", "📞 Feedback"], // Row2 with 2 buttons
  ])
    .resize()
    .oneTime(false);
};
