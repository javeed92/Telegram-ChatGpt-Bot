import axios from "axios";
import ffmpeg from "fluent-ffmpeg";
import internal, { PassThrough, Readable } from "stream";
import { downloadVoiceMessage } from "./downloadTelegramAudioFile";

export async function convertAudioFileByLocalFile(
  fileUrl: string
): Promise<string> {
  const filePath = await downloadVoiceMessage(fileUrl);

  return new Promise((resolve, reject) => {
    const convertedFilePath = `${filePath.slice(0, -3)}mp3`;
    ffmpeg(filePath)
      .toFormat("mp3")
      .on("data", (chunk) => {
        console.log({ chunk });
      })
      .on("end", () => {
        console.log("Audio file converted successfully");
        resolve(convertedFilePath);
      })
      .on("error", (err) => {
        console.error("Error converting audio file:", err);
        reject(err);
      })
      .save(convertedFilePath);
  });
}
export async function convertAudioFileWithStream(audioUrl: string): Promise<internal.Readable> {
  try {
    const response = await axios.get(audioUrl, { responseType: "stream" });
    let bufferStream = new PassThrough();
    return new Promise((resolve, reject) => {
      const convertedBuffer: any = [];
      ffmpeg()
        .input(response.data)
        .format("oga")
        .audioCodec("libmp3lame")
        .on("end", () => {
          console.log("Audio file converted successfully");
          // resolve(Buffer.concat(convertedBuffer));
        })
        .on("error", (err) => {
          console.error("Error converting audio file:", err);
          reject(err);
        })
        .outputFormat("mp3")
        .writeToStream(bufferStream);

      bufferStream.on("data", function (buf) {
        convertedBuffer.push(buf);
      });
      bufferStream.on("end", function () {
        console.log("Audio file buffered successfully");
        const audiostream = Readable.from(Buffer.concat(convertedBuffer));
        // @ts-expect-error
        audiostream.path = "audio.mp3";
        resolve(audiostream);
      });
    });
  } catch (err) {
    console.error("Error retrieving audio file:", err);
    throw err;
  }
}
