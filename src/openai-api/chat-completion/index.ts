import { ChatCompletionRequestMessage } from "openai";
import openaiAPI from "../config";
import logger from "@/config/logger";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";
import { ChatCompletionResponse } from "@/types/openai-api";

export const createCompletion = async (
  prompt: string
): Promise<string | undefined> => {
  // Generate a response from the OpenAI ChatGPT model
  try {
    logger.debug("Processing...");
    const response = await openaiAPI.createCompletion({
      prompt,
      max_tokens: 50,
      model: "text-davinci-003",
      n: 1,
    });

    return response.data.choices[0].text;
  } catch (error: any) {
    throw error;
  }
};

export const createChatCompletion = async (
  messages: ChatCompletionRequestMessage[],
  user: string | undefined,
  subscription?: BotSubscription
): Promise<ChatCompletionResponse> => {
  // Generate a response from the OpenAI ChatGPT model
  try {
    logger.debug("createChatCompletion --- Processing...");
    const max_tokens = subscription === BotSubscription.FREE ? 256 : undefined;
    const response = await openaiAPI.createChatCompletion({
      user,
      messages,
      model: "gpt-3.5-turbo",
      max_tokens,
      n: 1,
    });
    logger.debug("createChatCompletion --- Completed...");
    logger.debug(response.data);

    return {
      text: response.data.choices[0].message?.content ?? null,
      usage: response.data.usage ?? null,
    };
  } catch (error: any) {
    throw error;
  }
};
