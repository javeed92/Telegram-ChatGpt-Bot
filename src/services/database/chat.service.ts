import logger from "@/config/logger";
import ChatModel from "@/models/chat";
import { IChat, IChatCreate, IChatDocument } from "@/types/models";
import { FilterQuery } from "mongoose";

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
    const _chat = await ChatModel.findOneAndReplace({ id: chat.id }, chat, {
      upsert: true,
      new: true,
    });

    return _chat;
  } catch (error) {
    throw error;
  }
};

export const updateTelegramChat = async (
  id: number,
  updates: FilterQuery<IChatDocument>
) => {
  try {
    const _chatUpdateInfo = await ChatModel.updateOne({ id: id }, updates);
    logger.debug(`*****_chatUpdateInfo**** ${id}`);
    logger.debug({ _chatUpdateInfo });
    return _chatUpdateInfo;
  } catch (error) {
    throw error;
  }
};
