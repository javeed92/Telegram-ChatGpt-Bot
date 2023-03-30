import { botConfig } from "@/config/environment";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";
import { SessionData } from "@/types/bot/customContext";
import { getOneMonthLaterDate } from "./date.utils";

export default () => {
  const defaultSessionData: SessionData = {
    maxDailyMessages: botConfig.Free.DAILY_MESSAGES_LIMIT,
    messagesCount: 0,
    maxDailyVoices: botConfig.Free.DAILY_VOICES_LIMIT,
    voiceCount: 0 ,
    maxMonthlyImages: botConfig.Free.MONTHLY_IMAGES_LIMIT,
    imagesCount: 0,
    imagesResetDate: getOneMonthLaterDate(),
    currentTopic: "default",
    topics: [],
    subscription: BotSubscription.FREE
  };
  return defaultSessionData;
};
