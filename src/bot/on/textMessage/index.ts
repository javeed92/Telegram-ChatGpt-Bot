import { Composer } from "telegraf";
import { message } from "telegraf/filters";
import { getChatByTelegramChatId } from "@/services/database/chat";
import { addMessageToHistoryByChatId } from "@/services/database/messages_history";
import { createChatCompletion } from "@/openai-api/chat-complation";
import { prepareChatComplationMessages } from "@/utils/formatMessages";
import { MyContext } from "@/types/bot/customContext";
import logger from "@/config/logger";
import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { usageCheckForText } from "@/bot/middlewares/usageCheck.middleware";

const composer = new Composer<MyContext>();

composer.on(message("text"), usageCheckForText, async (ctx) => {
  logger.info({ session: ctx.session });
  try {
    logger.info({ incomingMessageFromBotUser: ctx.message });
    // save user input as part of message history
    await addMessageToHistoryByChatId(
      String(ctx.message.chat.id),
      ctx.session?.currentTopic,
      {
        text: ctx.message.text,
        date: new Date(ctx.message?.date * 1000),
      }
    );
    // get messages for creating chatComplation
    const currentChat = await getChatByTelegramChatId(
      ctx.message.chat.id,
      ctx.session?.currentTopic,
      true
    );

    if (currentChat?.messages?.length) {
      const reply = await ctx.reply("Please wait..");

      const messages = prepareChatComplationMessages(currentChat.messages);
      // generate response based on input messages using openai api chatComplation endpoint
      const response = await createChatCompletion(
        messages,
        String(currentChat?._id)
      );

      if (!response)
        return await ctx.reply("Could not answer! Please provide more context");

      // Update limiter of session
      ctx.session ? ctx.session.messagesCount++ : "";
      // Response to the end user
      await ctx.deleteMessage(reply.message_id);
      await ctx.reply(response);
      // save api response as part of message history
      await addMessageToHistoryByChatId(
        String(ctx.message.chat.id),
        ctx.session?.currentTopic,
        {
          text: response,
          date: new Date(),
          role: ChatCompletionRequestMessageRoleEnum.Assistant,
        }
      );
    }
  } catch (error: any) {
    throw error;
  }
});

export default composer;
