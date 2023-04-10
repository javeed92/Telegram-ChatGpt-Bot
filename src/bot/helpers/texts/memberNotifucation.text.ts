import { channelLink } from "@/bot/config/defaults.config";
import { IChat } from "@/types/models";
import { fmt, link } from "telegraf/format";

export const memberStatusUpdateNotif = (chat: IChat) => {
  const text = `Member status change: ${chat.status}
Member ID: ${chat.id}
Member username: ${chat.username}`;

  return text;
};
export const accessDeniedResponseText = fmt`You don't have an earlier access. We will inform you as soon as bot will be ready. 
Meanwhile you can join to our ${link('@Channel', channelLink)} to get new updates`
