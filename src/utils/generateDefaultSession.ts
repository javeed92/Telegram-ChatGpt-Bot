import { BotSubscription } from "@/helpers/enums/botSubscription.enums";
import { SessionData } from "@/types/bot/customContext";
import { getSpesifiedMonthLaterDate } from "./date.utils";
import { botSubscriptionsLimitConfig } from "@/bot/config/defaults.config";

export default () => {
  const defaultSessionData: SessionData = {
    maxDailyMessages: botSubscriptionsLimitConfig.Free.DAILY_MESSAGES_LIMIT,
    messagesCount: 0,
    maxDailyVoices: botSubscriptionsLimitConfig.Free.DAILY_VOICES_LIMIT,
    voiceCount: 0 ,
    maxMonthlyImages: botSubscriptionsLimitConfig.Free.MONTHLY_IMAGES_LIMIT,
    imagesCount: 0,
    imagesResetDate: getSpesifiedMonthLaterDate(),
    currentTopic: "default",
    topics: [],
    subscription: BotSubscription.FREE
  };
  return defaultSessionData;
};
