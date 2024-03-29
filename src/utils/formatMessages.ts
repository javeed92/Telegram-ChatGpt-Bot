import { IMessagesHistory } from "@/types/models";

export const prepareChatcompletionMessages = (messages: IMessagesHistory[]) => {
  messages = messages.reverse()
  const formattedMessages = messages.map((mes) => {
    return {
      content: mes.text,
      role: mes.role || "user",
    };
  });

  return formattedMessages;
};
