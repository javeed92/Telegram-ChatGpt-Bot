import ChatModel from "@/models/chat";

export const getChatByTelegramChatId = async (
  id: number | undefined,
  populate: boolean = false
) => {
  try {
    const chat = populate
      ? await ChatModel.findOne({ id }).populate("messages").lean()
      : await ChatModel.findOne({ id });

    return chat;
  } catch (error) {
    throw error;
  }
};

export const createTelegramChat = async (chatInput: any) => {
  try {
    const chat = await ChatModel.findOneAndReplace(
      { id: chatInput.id },
      chatInput,
      { upsert: true }
    );

    return chat;
  } catch (error) {
    throw error;
  }
};
