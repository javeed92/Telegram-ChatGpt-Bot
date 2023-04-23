import { Composer } from "telegraf";
import { message } from "telegraf/filters";
import { MyContext } from "@/types/bot/customContext";
import logger from "@/config/logger";
import {
  convertAudioFileByLocalFile,
  convertAudioFileWithStream,
} from "@/utils/convetAudioFile";
import { createTranscription } from "@/openai-api/whisper";
import { createChatCompletion } from "@/openai-api/chat-completion";
import { escapeCodeBlock, splitText } from "@/utils/escapeMarkdown2";
import { usageCheckForVoice } from "@/bot/middlewares/usageCheck.middleware";
import { voiceToImageTextPrompt } from "@/bot/helpers/texts/commandResponse.texts";
import { Message } from "telegraf/typings/core/types/typegram";
import { generateImage } from "@/replicate-api/openjourney-model";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";
import { listeningFrogStickerFileId, typingSharkStickerFileId } from "@/bot/helpers/stickers";

const composer = new Composer<MyContext>();

composer.on(message("voice"), usageCheckForVoice, async (ctx) => {
  try {
    let msg = await ctx.sendSticker(listeningFrogStickerFileId);

    if (
      ctx.session.subscription === BotSubscription.FREE &&
      ctx.message.voice.duration > 5
    ) {
      return await ctx.sendMessage(
        "In Free subscription only voices with duration below 5 is allowed"
      );
    }

    const fileUrl = await ctx.telegram.getFileLink(ctx.message.voice.file_id);

    // Operation on the disk
    // const convertedFilePath = await convertAudioFileByLocalFile(fileUrl.href)

    // Operation with streams
    const convertedFileStream = await convertAudioFileWithStream(fileUrl.href);

    await ctx.deleteMessage(
      msg.message_id
    );

    msg = await ctx.sendSticker(typingSharkStickerFileId)

    const voiceText = await createTranscription(convertedFileStream);

    // Update voice counter session
    ctx.session.voiceCount = ctx.session.voiceCount + 1;

    if (!voiceText) {
      await ctx.sendMessage(
        "Could not understand what you aimed to say, can you repeat?"
      );
      throw new Error("Something went wrong");
    }

    // Check if voice intented to create image if yes, or just reponse from chat completion
    if (
      ctx.message.reply_to_message &&
      "text" in ctx.message.reply_to_message &&
      ctx.message.reply_to_message.from?.is_bot &&
      ctx.message.reply_to_message.text === voiceToImageTextPrompt
    ) {
      return await handleVoiceToImage(ctx, msg, voiceText);
    } else {
      return await handleVoiceToTextCompletion(ctx, msg, voiceText);
    }
  } catch (error: any) {
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

export const handleVoiceToImage = async (
  ctx: MyContext,
  msg: Message.StickerMessage,
  voiceText: string
) => {
  try {
    const url = await generateImage(voiceText);
    logger.debug(url);

    if (!url) {
      await ctx.sendMessage(
        "Having some problem while generating image, please try again later"
      );
      throw new Error("Something went wrong");
    }

    ctx.session.imagesCount++;

    await ctx.deleteMessage(msg.message_id);

    return await ctx.sendPhoto({ url });
  } catch (error) {
    throw error;
  }
};

export const handleVoiceToTextCompletion = async (
  ctx: MyContext,
  msg: Message.StickerMessage,
  voiceText: string
) => {
  try {
    if (ctx.has("message")) {
      const { text: completionText, usage } = await createChatCompletion(
        [{ role: "user", content: voiceText }],
        ctx.message.from.username,
        ctx.session.subscription
      );

      ctx.deleteMessage(msg.message_id);
      
      if (completionText?.includes("```"))
        await sendCodeMessages(ctx, completionText);
      else await ctx.sendMessage(completionText || "Sorry could not understood you.");
    }
  } catch (error) {
    throw error;
  }
};

export default composer;
