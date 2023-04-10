import { channelLink } from "@/bot/config/defaults.config";
import { fmt, italic, link } from "telegraf/format";
import { Message } from "telegraf/typings/core/types/typegram";

export const donationResponseText = fmt`Please respond to this message, how much amount you want to donate :) Your donations will help us to improve our services and user experience.
You can also visit our ${link("@Channel", channelLink)} to be aware of news`;

export const feedbackResponseText = fmt`Please respond to this message your feedback or question, you can also visit our ${link(
  "@Channel",
  channelLink
)} to be aware of news`;

export const createFeedbackMessage = (message: Message.TextMessage) => {
  const msg = fmt`Feedback from : ${message.from?.username} |${
    message.from?.id
  }|
${italic`${message.text}`}
`;
  return msg;
};

export const createAdminFeedbackResponse = (message: Message.TextMessage) => {
  const msg = fmt`Response from support:
${italic`${message.text}`}
`;
  return msg;
};
