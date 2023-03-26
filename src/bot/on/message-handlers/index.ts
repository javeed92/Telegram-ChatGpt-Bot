import { Composer } from "telegraf";
import { message } from "telegraf/filters";
import { getChatByTelegramChatId } from "@/services/database/chat";
import { addMessageToHistoryByChatId } from "@/services/database/messages_history";
import { createChatCompletion } from "@/openai_api";
import { prepareChatComplationMessages } from "@/utils/formatMessages";
import { MyContext } from "@/types/bot/customContext";
import logger from "@/config/logger";

const composer = new Composer<MyContext>();

composer.on(message("text"), async (ctx) => {
  logger.info({ session: ctx.session });
  try {
    logger.info({ incomingMessageFromBotUser: ctx.message });

    await addMessageToHistoryByChatId(String(ctx.message.chat.id), {
      text: ctx.message?.text,
      date: new Date(ctx.message?.date * 1000),
    });

    const currentChat = await getChatByTelegramChatId(
      ctx.message?.chat.id,
      true
    );

    if (currentChat?.messages) {
      const messages = prepareChatComplationMessages(currentChat.messages);

      const response = await createChatCompletion(
        messages,
        String(currentChat?._id)
      );
      if (!response) return await ctx.reply("Could not answer!");
      ctx.session ? ctx.session.messageCount++ : "";
      return await ctx.reply(response);
    }
  } catch (error: any) {
    console.log(error.response.data.error);
    await ctx.reply("Please try again later");
  }
});

export default composer;
