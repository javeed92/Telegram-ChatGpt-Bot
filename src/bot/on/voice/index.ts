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

const composer = new Composer<MyContext>();

composer.on(message("voice"), usageCheckForVoice, async (ctx) => {
  try {
    let message = await ctx.sendMessage("Processing voice...");
    const fileUrl = await ctx.telegram.getFileLink(ctx.message.voice.file_id);

    // Operation on the disk
    // const convertedFilePath = await convertAudioFileByLocalFile(fileUrl.href)

    // Operation with streams
    const convertedFileStream = await convertAudioFileWithStream(fileUrl.href);

    ctx.telegram.editMessageText(
      ctx.message.chat.id,
      message.message_id,
      undefined,
      "Creating transcript..."
    );
    const voiceText = await createTranscription(convertedFileStream);

    // Update voice counter session
    ctx.session.voiceCount = ctx.session.voiceCount + 1

    if (!voiceText) {
      throw new Error("Something went wrong");
    }

    const completionText = await createChatCompletion(
      [{ role: "user", content: voiceText }],
      ctx.message.from.username
    );

    ctx.deleteMessage(message.message_id);
    if (completionText?.includes("```"))
      await sendCodeMessages(ctx, completionText);
    else await ctx.sendMessage(completionText || "");
  } catch (error: any) {
    throw error;
  }
});

// Util functions

async function sendCodeMessages(ctx: MyContext, text: string) {
  const { codeBlocks, parts } = splitText(text || "");
  console.log({ codeBlocks, parts });

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
