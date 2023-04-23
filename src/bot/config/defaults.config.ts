import environment from "@/config/environment";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";

export const PremiumSubscriptionPricesMonthly = {
  "1": "199 rubl",
  "6": "390 rubl 💥hit",
  "12": "790 rubl",
};

export const PremiumSubscriptionPricesForInvoiceMonthly = {
  "1": 19900,
  "6": 39000,
  "12": 79000,
};

export const botSubscriptionsLimitConfig = {
  [BotSubscription.FREE]: {
    DAILY_MESSAGES_LIMIT: 15,
    DAILY_VOICES_LIMIT: 3,
    MONTHLY_IMAGES_LIMIT: 5,
  },
  [BotSubscription.PREMIUM]: {
    DAILY_MESSAGES_LIMIT: 200,
    DAILY_VOICES_LIMIT: 5,
    MONTHLY_IMAGES_LIMIT: 100,
  },
};

export enum PaymentProviderCurrency {
  YOOKASSA = "RUB",
  SMART = 'RUB'
}

export const paymentProviderConfig = {
  activeProviderCurrency: PaymentProviderCurrency.YOOKASSA,
  activeProviderToken: environment.PAYMENT_YOOKASSA_TOKEN,
};

export const channelLink = 'https://t.me/inniBotChannel'