import { IChat } from "@/types/models";

export const memberStatusUpdateNotif = (chat: IChat) => {
  const text = `Member status change: ${chat.status}
Member ID: ${chat.id}
Member username: ${chat.username}`;

  return text;
};
