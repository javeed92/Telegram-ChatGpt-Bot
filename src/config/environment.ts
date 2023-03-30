import { BotSubscription } from "@/helpers/enums/botSubscription.enums";

const { PORTE, OPEN_AI_API_KEY, TELEGRAM_TOKEN, WEBHOOK_DOMAIN, MONGO_CONNECTION_URL, ERROR_REPORT_CHAT_ID, REPLICATE_API_TOKEN, WHITE_LIST_CHAT_ID } =
  process.env as {
    PORTE: string;
    OPEN_AI_API_KEY: string;
    TELEGRAM_TOKEN: string;
    WEBHOOK_DOMAIN: string;
    MONGO_CONNECTION_URL: string;
    ERROR_REPORT_CHAT_ID: string;
    REPLICATE_API_TOKEN: string;
    WHITE_LIST_CHAT_ID: string;
  };

export const botConfig = {
  [BotSubscription.FREE]: {
    DAILY_MESSAGES_LIMIT: 35,
    DAILY_VOICES_LIMIT: 3,
    MONTHLY_IMAGES_LIMIT: 12
  },
  [BotSubscription.PREMIUM]: {
    DAILY_MESSAGES_LIMIT: 100,
    DAILY_VOICES_LIMIT: 100,
    MONTHLY_IMAGES_LIMIT: 100
  }
}

export default {
  PORTE,
  OPEN_AI_API_KEY,
  TELEGRAM_TOKEN,
  WEBHOOK_DOMAIN,
  MONGO_CONNECTION_URL,
  ERROR_REPORT_CHAT_ID,
  REPLICATE_API_TOKEN,
  WHITE_LIST_CHAT_ID
};
