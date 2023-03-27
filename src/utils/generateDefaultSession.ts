import { SessionData } from "@/types/bot/customContext";

export default () => {
  const defaultSessionData: SessionData = {
    maxDailyMessages: 10,
    messagesCount: 0,
    maxMonthlyImages: 10,
    imagesCount: 0,
    imagesResetDate: new Date(),
    currentTopic: "default_topic",
    topics: [],
    subscription: 'Free'
  };
  return defaultSessionData;
};
