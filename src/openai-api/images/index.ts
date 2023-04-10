import openaiAPI from "../config";
import logger from "@/config/logger";

export const createImage = async (
  prompt: string,
  user: string | undefined
): Promise<string | undefined> => {
  // Generate a response from the OpenAI ChatGPT model
  try {
    logger.debug("createImage --- Processing...");
    const response = await openaiAPI.createImage({
      user,
      prompt,
      n: 1,
      response_format: "url",
      size: "512x512",
    });
    logger.debug("createImage --- Completed...");
    return response.data.data[0].url;
  } catch (error: any) {
    throw error
  }
};
