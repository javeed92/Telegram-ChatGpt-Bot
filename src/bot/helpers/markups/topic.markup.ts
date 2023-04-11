import { Markup } from "telegraf";

export const topicToCheckout = (topics: string[]) => {
  const inlineKeyboardArr = [];

  for (const topic of topics) {
    const callbackButton = Markup.button.callback(topic, `t-checkout ${topic}`);

    inlineKeyboardArr.push(callbackButton);
  }

  return Markup.inlineKeyboard(inlineKeyboardArr);
};

export const topicToDelete = (topics: string[]) => {
  const inlineKeyboardArr = [];

  for (const topic of topics) {
    const callbackButton = Markup.button.callback(topic, `t-delete ${topic}`);

    inlineKeyboardArr.push(callbackButton);
  }

  return Markup.inlineKeyboard(inlineKeyboardArr);
};
