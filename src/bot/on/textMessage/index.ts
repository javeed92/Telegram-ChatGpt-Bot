import { Composer } from "telegraf";
import { message } from "telegraf/filters";
import { getChatByTelegramChatId } from "@/services/database/chat.service";
import {
  addMessageToHistoryByChatId,
  deleteMessagesFromHistoryByChatTopic,
} from "@/services/database/messages_history.service";
import { createChatCompletion } from "@/openai-api/chat-completion";
import { prepareChatcompletionMessages } from "@/utils/formatMessages";
import { MyContext } from "@/types/bot/customContext";
import logger from "@/config/logger";
import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { usageCheckForText } from "@/bot/middlewares/usageCheck.middleware";
import { escapeCodeBlock, splitText } from "@/utils/escapeMarkdown2";
import { donationResponseText } from "@/bot/helpers/texts/hearResponse.text";
import { createDonationInvoice } from "@/bot/helpers/texts/invoice";

const composer = new Composer<MyContext>();


// Donation reply

composer.on(message("text"), usageCheckForText, async (ctx, next) => {
  logger.info({ session: ctx.session });
  try {
    if (
      ctx.message.reply_to_message &&
      "text" in ctx.message.reply_to_message &&
      ctx.message.reply_to_message.from?.is_bot &&
      ctx.message.reply_to_message.text === donationResponseText
    ) {
      await ctx.sendInvoice(
        createDonationInvoice(ctx.message.chat.id, parseInt(ctx.message.text))
      );
    }


  } catch (error: any) {
    throw error;
  }
});

composer.on(message("text"), usageCheckForText, async (ctx) => {
  logger.info({ session: ctx.session });
  try {
    await ctx.sendChatAction("typing");
    logger.info({ incomingMessageFromBotUser: ctx.message });
    // save user input as part of message history
    await addMessageToHistoryByChatId(
      ctx.message.chat.id,
      ctx.session?.currentTopic,
      {
        text: ctx.message.text,
        date: new Date(ctx.message?.date * 1000),
      }
    );
    // get messages for creating chatcompletion
    const currentChat = await getChatByTelegramChatId(
      ctx.message.chat.id,
      ctx.session?.currentTopic,
      true
    );

    if (currentChat?.messages?.length) {
      const reply = await ctx.reply("Please wait..");
      await ctx.sendChatAction("typing");

      const messages = prepareChatcompletionMessages(currentChat.messages);
      // generate response based on input messages using openai api chatcompletion endpoint
      const response = await createChatCompletion(
        messages,
        String(currentChat?._id)
      );

      if (!response)
        return await ctx.reply("Could not answer! Please provide more context");

      // Update message counter of session
      ctx.session ? ctx.session.messagesCount++ : "";

      // Response to the end user
      await ctx.deleteMessage(reply.message_id);

      if (response.includes("```")) await sendCodeMessages(ctx, response);
      else await ctx.sendMessage(response);

      // save api response as part of message history
      await addMessageToHistoryByChatId(
        ctx.message.chat.id,
        ctx.session?.currentTopic,
        {
          text: response,
          date: new Date(),
          role: ChatCompletionRequestMessageRoleEnum.Assistant,
        }
      );
    }
  } catch (error: any) {
    if (error.response?.data?.error?.code === "context_length_exceeded") {
      deleteMessagesFromHistoryByChatTopic(
        ctx.message.chat.id,
        ctx.session.currentTopic
      );
      await ctx.sendMessage(
        "Could not understand you, can you explain it with more context please ?"
      );
    }
    throw error;
  }
});

// Util functions

async function sendCodeMessages(ctx: MyContext, text: string) {
  const { codeBlocks, parts } = splitText(text || "");

  for (let txt of parts) {
    if (!txt) continue;
    let cTxt: string | undefined;
    if ((cTxt = codeBlocks?.find((cb) => cb.includes(txt)))) {
      logger.debug("MARKDOWN MESSAGE");
      txt = escapeCodeBlock(cTxt);
      await ctx.replyWithMarkdownV2(txt);
    } else {
      await ctx.sendMessage(txt);
    }
  }
}

export default composer;
