import { Composer } from "telegraf";
import { message } from "telegraf/filters";
import { MyContext } from "@/types/bot/customContext";
import logger from "@/config/logger";
import {
  convertAudioFileByLocalFile,
  convertAudioFileWithStream,
} from "@/utils/convetAudioFile";
import { createTranscription } from "@/openai-api/whisper";
import {
  createChatCompletion,
} from "@/openai-api/chat-complation";
import { escapeCodeBlock, splitCodeBlock } from "@/utils/escapeMarkdown2";

const composer = new Composer<MyContext>();

composer.on(message("voice"), async (ctx) => {
  try {
    const fileUrl = await ctx.telegram.getFileLink(ctx.message.voice.file_id);

    // Operation on the disk
    // const convertedFilePath = await convertAudioFileByLocalFile(fileUrl.href)

    // Operation with streams
    const convertedFileStream = await convertAudioFileWithStream(fileUrl.href);

    const voiceText = await createTranscription(convertedFileStream);

    if (!voiceText) {
      throw new Error("Something went wrong");
    }

    const complationText = await createChatCompletion(
      [{ role: "user", content: voiceText }],
      ctx.message.from.username
    );

    const textArray = splitCodeBlock(complationText || "");
    console.log(textArray);

    for (let txt of textArray) {
      if (!txt) continue;
      if (txt.startsWith("```")) {
        logger.debug("MARKDOWN MESSAGE");
        txt = escapeCodeBlock(txt);
        await ctx.sendMessage(txt, { parse_mode: "MarkdownV2" });
      } else {
        await ctx.sendMessage(txt);
      }
    }
  } catch (error: any) {
    throw error;
  }
});

export default composer;
