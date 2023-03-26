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
  chat_id: string | undefined,
  payload: {
    text: string | undefined;
    date: Date | string | undefined;
    role?: string | undefined;
  } = {
    role: 'user',
    date: undefined,
    text: undefined
  }
) => {
  try {
    const message = await MessagesHistory.create({ chat_id, ...payload });

    return message;
  } catch (error) {
    throw error;
  }
};
