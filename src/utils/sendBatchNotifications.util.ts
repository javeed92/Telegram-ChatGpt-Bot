import bot from "@/bot";
import { ISessionDataRaw } from "@/types/models";

const batchSize = 31; // Maximum batch size
const delay = 60000; // 1 second delay between batches

const sendBatch = async (batch: string[], message: string) => {
  const promises = batch.map((chatId) => bot.telegram.sendMessage(chatId, message));
  return Promise.allSettled(promises);
};

export const sendBatches = async (
  sessions: ISessionDataRaw[],
  message: string
) => {
  const batches: Array<Array<string>> = [];

  const chatIds: Array<string> = sessions.map((session) => session.key.split(":")[0]);

  for (let i = 0; i < chatIds.length; i += batchSize) {
    const batch = chatIds.slice(i, i + batchSize);
    batches.push(batch);
  }

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    await sendBatch(batch, message);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};
