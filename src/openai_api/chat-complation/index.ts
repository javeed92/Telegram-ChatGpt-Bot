import { ChatCompletionRequestMessage } from "openai";
import openaiAPI from "../config";
import logger from "@/config/logger";

export const createCompletion = async (
  prompt: string
): Promise<string | undefined> => {
  // Generate a response from the OpenAI ChatGPT model
  try {
    console.log("Processing...");
    const response = await openaiAPI.createCompletion({
      prompt,
      max_tokens: 50,
      model: "text-davinci-003",
      n: 1,
      stop: "\n",
    });
    console.log("Completed...");
    console.dir(response.data);

    return response.data.choices[0].text;
  } catch (error: any) {
    // console.log(error.response.data);
    throw error
  }
};

export const createChatCompletion = async (
  messages: ChatCompletionRequestMessage[],
  user: string | undefined
): Promise<string | undefined> => {
  // Generate a response from the OpenAI ChatGPT model
  try {
    logger.debug("createChatCompletion --- Processing...");
    const response = await openaiAPI.createChatCompletion({
      user,
      messages,
      model: "gpt-3.5-turbo",
      n: 1,
    });
    logger.debug("createChatCompletion --- Completed...");
    console.dir(response.data, {depth: Infinity});

    return response.data.choices[0].message?.content;
  } catch (error) {
    // console.log(error);
    throw error
  }
};
