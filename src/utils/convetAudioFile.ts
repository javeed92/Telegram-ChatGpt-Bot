import axios from "axios";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import internal, { PassThrough, Readable } from "stream";
import { downloadVoiceMessage } from "./downloadTelegramAudioFile";
import logger from "@/config/logger";

export async function convertAudioFileByLocalFile(
  fileUrl: string
): Promise<string> {
  const filePath = await downloadVoiceMessage(fileUrl);
  logger.debug({ ffmpegPath });
  return new Promise((resolve, reject) => {
    const convertedFilePath = `${filePath.slice(0, -3)}mp3`;
    ffmpeg(filePath)
      .setFfmpegPath(ffmpegPath!)
      .toFormat("mp3")
      .on("end", () => {
        logger.debug("Audio file converted successfully");
        resolve(convertedFilePath);
      })
      .on("error", (err) => {
        logger.error("Error converting audio file:", err);
        reject(err);
      })
      .save(convertedFilePath);
  });
}
export async function convertAudioFileWithStream(
  audioUrl: string
): Promise<internal.Readable> {
  try {
    const response = await axios.get(audioUrl, { responseType: "stream" });
    let bufferStream = new PassThrough();
    logger.debug({ ffmpegPath });
    return new Promise((resolve, reject) => {
      const convertedBuffer: any = [];
      ffmpeg()
        .setFfmpegPath(ffmpegPath!)
        .input(response.data)
        .format("oga")
        .audioCodec("libmp3lame")
        .on("end", () => {
          logger.debug("Audio file converted successfully");
          // resolve(Buffer.concat(convertedBuffer));
        })
        .on("error", (err) => {
          logger.error("Error converting audio file:", err);
          reject(err);
        })
        .outputFormat("mp3")
        .writeToStream(bufferStream);

      bufferStream.on("data", function (buf) {
        convertedBuffer.push(buf);
      });
      bufferStream.on("end", function () {
        logger.debug("Audio file buffered successfully");
        const audiostream = Readable.from(Buffer.concat(convertedBuffer));
        // @ts-expect-error
        audiostream.path = "audio.mp3";
        resolve(audiostream);
      });
    });
  } catch (err) {
    throw err;
  }
}
