import logger from "@/config/logger";
import { messageQueue } from "./config";
import bot from "@/bot";
import { addMessageToHistoryByChatId } from "@/services/database/messages_history.service";
import {
  INarrowedMyContext,
  MyContext,
  NarrowedCtxObjectMessage,
  SessionData,
} from "@/types/bot/customContext";
import { getChatByTelegramChatId } from "@/services/database/chat.service";
import {
  prepareChatcompletionMessages,
  sendCodeMessages,
} from "@/utils/formatMessages";
import { createChatCompletion } from "@/openai-api/chat-completion";
import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { Message } from "telegraf/typings/core/types/typegram";
import { IMessageQueuePayload } from "@/types/queue/message-queue";
import { updateSessions } from "@/services/database/session.service";

export const createMessageJob = async (payload: any) => {
  try {
    logger.debug("createMessageJob - adding to queue - started");
    const job = await messageQueue.add(payload);
    console.log({ createdJob: job });
    logger.debug("createMessageJob - adding to queue - finished");
    return job;
  } catch (error) {
    throw error;
  }
};

messageQueue.process(async (job: any) => {
  const { message, msgToEdit, session } = job.data as IMessageQueuePayload;

  try {
    await bot.telegram.sendChatAction(message.chat.id, "typing");
    // save user input as part of message history
    await addMessageToHistoryByChatId(
      message.chat.id,
      session.currentTopic,
      {
        text: message.text,
        date: new Date(message?.date * 1000),
      }
    );
    // get messages for creating chatcompletion
    const currentChat = await getChatByTelegramChatId(
      message.chat.id,
      session?.currentTopic,
      true
    );

    if (currentChat?.messages?.length) {
      await bot.telegram.sendChatAction(message.chat.id,"typing");

      const messages = prepareChatcompletionMessages(currentChat.messages);
      // generate response based on input messages using openai api chatcompletion endpoint
      const { text: response, usage } = await createChatCompletion(
        messages,
        String(currentChat?._id),
        session.subscription
      );

      if (!response)
        return await bot.telegram.sendMessage(message.chat.id,"Could not answer! Please provide more context");

      // Update message counter of session and token usage
      await updateSessions({key: `${message.chat.id}:${message.chat.id}`},{
        "session.messagesCount": session.messagesCount+1,
        "session.totalTokenUsage": session.totalTokenUsage + (usage?.total_tokens ?? 0)
      })

      // Response to the end user
      await bot.telegram.deleteMessage(message.chat.id,msgToEdit.message_id);

      await bot.telegram.sendMessage(message.chat.id,response);

      // save api response as part of message history
      await addMessageToHistoryByChatId(
        message.chat.id,
        session?.currentTopic,
        {
          text: response,
          date: new Date(),
          role: ChatCompletionRequestMessageRoleEnum.Assistant,
        }
      );
    }
  } catch (error) {
    throw error;
  }
});
