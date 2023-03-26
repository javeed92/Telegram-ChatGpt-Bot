const { PORT, OPEN_AI_API_KEY, TELEGRAM_TOKEN, WEBHOOK_DOMAIN, MONGO_CONNECTION_URL } =
  process.env as {
    PORT: string;
    OPEN_AI_API_KEY: string;
    TELEGRAM_TOKEN: string;
    WEBHOOK_DOMAIN: string;
    MONGO_CONNECTION_URL: string;
  };

// for (const key in process.env) {
//   console.log(`${key} and value is ${process.env[key]}`)
//   if (!process.env[key]) {
//     console.log("Env is not properly set!");
//     process.exit(1);
//   }
// }

export default {
  PORT,
  OPEN_AI_API_KEY,
  TELEGRAM_TOKEN,
  WEBHOOK_DOMAIN,
  MONGO_CONNECTION_URL
};
