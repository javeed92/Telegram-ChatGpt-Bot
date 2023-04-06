import { BotSubscription } from "@/helpers/enums/botSubscription.enums"

export const PremiumSubscriptionPricesMonthly = {
    '1': '5$',
    '2': '9.5$',
    '3': '12$',
    '6': '25$',
    '12': '50$'
}

export const PremiumSubscriptionPricesForInvoiceMonthly = {
    '1': 500,
    '2': 950,
    '3': 1200,
    '6': 2500,
    '12': 5000
}

export const botSubscriptionsLimitConfig = {
    [BotSubscription.FREE]: {
      DAILY_MESSAGES_LIMIT: 10,
      DAILY_VOICES_LIMIT: 3,
      MONTHLY_IMAGES_LIMIT: 5
    },
    [BotSubscription.PREMIUM]: {
      DAILY_MESSAGES_LIMIT: 100,
      DAILY_VOICES_LIMIT: 30,
      MONTHLY_IMAGES_LIMIT: 40
    }
  }