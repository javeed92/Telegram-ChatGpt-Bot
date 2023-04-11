const {
  PORT,
  OPEN_AI_API_KEY,
  TELEGRAM_TOKEN,
  WEBHOOK_DOMAIN,
  MONGO_CONNECTION_URL,
  ERROR_REPORT_CHAT_ID,
  REPLICATE_API_TOKEN,
  WHITE_LIST_CHAT_IDs,
  PAYMENT_YOOKASSA_TOKEN,
  PAYMENT_SMART_TOKEN,
  HELP_GROUP_ID
} = process.env as {
  PORT: string;
  OPEN_AI_API_KEY: string;
  TELEGRAM_TOKEN: string;
  WEBHOOK_DOMAIN: string;
  MONGO_CONNECTION_URL: string;
  ERROR_REPORT_CHAT_ID: string;
  REPLICATE_API_TOKEN: string;
  WHITE_LIST_CHAT_IDs: string;
  PAYMENT_YOOKASSA_TOKEN: string;
  PAYMENT_SMART_TOKEN: string;
  HELP_GROUP_ID: string;
};

export default {
  PORT,
  OPEN_AI_API_KEY,
  TELEGRAM_TOKEN,
  WEBHOOK_DOMAIN,
  MONGO_CONNECTION_URL,
  ERROR_REPORT_CHAT_ID,
  REPLICATE_API_TOKEN,
  WHITE_LIST_CHAT_IDs,
  PAYMENT_YOOKASSA_TOKEN,
  PAYMENT_SMART_TOKEN,
  HELP_GROUP_ID
};
