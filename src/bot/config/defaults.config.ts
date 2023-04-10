import environment from "@/config/environment";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";

export const PremiumSubscriptionPricesMonthly = {
  "1": "400rubl",
  "2": "750rubl",
  "3": "1050rubl",
  "6": "1400rubl",
  "12": "3000rubl",
};

export const PremiumSubscriptionPricesForInvoiceMonthly = {
  "1": 40000,
  "2": 75000,
  "3": 105000,
  "6": 140000,
  "12": 300000,
};

export const botSubscriptionsLimitConfig = {
  [BotSubscription.FREE]: {
    DAILY_MESSAGES_LIMIT: 10,
    DAILY_VOICES_LIMIT: 3,
    MONTHLY_IMAGES_LIMIT: 5,
  },
  [BotSubscription.PREMIUM]: {
    DAILY_MESSAGES_LIMIT: 100,
    DAILY_VOICES_LIMIT: 30,
    MONTHLY_IMAGES_LIMIT: 40,
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
