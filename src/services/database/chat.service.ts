import ChatModel from "@/models/chat";
import { IChatCreate } from "@/types/models";
import { Chat } from "telegraf/typings/core/types/typegram";

export const getChatByTelegramChatId = async (
  id: number | undefined,
  chat_topic: string | undefined,
  populate: boolean = false
) => {
  try {
    const chat = populate
      ? await ChatModel.findOne({ id })
          .populate({
            path: "messages",
            match: { chat_topic },
            options: { limit: 5, lean: true, sort: { date: -1 } },
          })
          .lean()
      : await ChatModel.findOne({ id }).lean();

    return chat;
  } catch (error) {
    throw error;
  }
};

export const createTelegramChat = async (chat: IChatCreate) => {
  try {
    const _chat = await ChatModel.findOneAndReplace(
      { id: chat.id },
      chat,
      { upsert: true, new: true }
    );

    return _chat;
  } catch (error) {
    throw error;
  }
};
