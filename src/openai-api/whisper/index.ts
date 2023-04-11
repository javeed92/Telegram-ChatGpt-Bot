import { PathLike, createReadStream } from "fs";
import openaiAPI from "../config";
import logger from "@/config/logger";
import { File } from "buffer";
import { Readable } from "stream";

export const createTranscription = async (
  file: Readable | PathLike
): Promise<string | undefined> => {
  // Generate a response from the OpenAI ChatGPT model
  try {
    logger.debug("createTranscription --- Processing...");
    if(file instanceof Readable){
      file
    }else{ 
      file = createReadStream(file)
    }
    const response = await openaiAPI.createTranscription(
      file,
      "whisper-1"
    );
    logger.debug("createTranscription --- Completed...");
    return response.data.text;
  } catch (error: any) {
    throw error
  }
};
