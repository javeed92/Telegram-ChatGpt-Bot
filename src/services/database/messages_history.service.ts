import { ICreateMessagesHistory } from "@/types/models";
import MessagesHistory from "../../models/messages_history";

export const getMessagesHistoryByChatId = async (
  chat_id: string | undefined
) => {
  try {
    const messages = await MessagesHistory.find({ chat_id });

    return messages;
  } catch (error) {
    throw error;
  }
};

export const addMessageToHistoryByChatId = async (
  chat_id: number | undefined,
  chat_topic: string | undefined,
  payload: Partial<ICreateMessagesHistory> = {
    role: "user",
    date: undefined,
    text: undefined,
  }
) => {
  try {
    const message = await MessagesHistory.create({
      chat_id,
      chat_topic,
      ...payload,
    });

    return message;
  } catch (error) {
    throw error;
  }
};

export const deleteMessagesFromHistoryByChatTopic = async (
  chat_id: number | undefined,
  chat_topic: string | undefined,
) => {
  try {
    const deletedInfo = await MessagesHistory.deleteMany({
      chat_id,
      chat_topic
    });

    return deletedInfo;
  } catch (error) {
    throw error;
  }
};
