const { PORTE, OPEN_AI_API_KEY, TELEGRAM_TOKEN, WEBHOOK_DOMAIN, MONGO_CONNECTION_URL, ERROR_REPORT_CHAT_ID } =
  process.env as {
    PORTE: string;
    OPEN_AI_API_KEY: string;
    TELEGRAM_TOKEN: string;
    WEBHOOK_DOMAIN: string;
    MONGO_CONNECTION_URL: string;
    ERROR_REPORT_CHAT_ID: string;
  };

// for (const key in process.env) {
//   console.log(`${key} and value is ${process.env[key]}`)
//   if (0) {
//     console.log("Env is not properly set!");
//     process.exit(1);
//   }
// }

export default {
  PORTE,
  OPEN_AI_API_KEY,
  TELEGRAM_TOKEN,
  WEBHOOK_DOMAIN,
  MONGO_CONNECTION_URL,
  ERROR_REPORT_CHAT_ID
};
