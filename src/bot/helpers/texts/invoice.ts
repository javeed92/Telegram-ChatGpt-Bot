import {
  PremiumSubscriptionPricesForInvoiceMonthly,
  botSubscriptionsLimitConfig,
  paymentProviderConfig,
} from "@/bot/config/defaults.config";
import environment from "@/config/environment";
import { generateOTP } from "@/utils/generateChargeIdentifier";
import { NewInvoiceParameters } from "telegraf/typings/telegram-types";

export const createInvoice = (month: string) => {
  const invoice: NewInvoiceParameters = {
    provider_token: paymentProviderConfig.activeProviderToken,
    start_parameter: `premium-${month}-month`,
    title: "Premium Subscription",
    description: invoiceDescriptionText(month),
    currency: paymentProviderConfig.activeProviderCurrency,
    photo_url:
      "https://static.vecteezy.com/system/resources/previews/000/546/318/original/diamond-vector-logo.jpg",
    prices: [
      {
        label: `${month} month`,
        amount:
          PremiumSubscriptionPricesForInvoiceMonthly[
            month as keyof typeof PremiumSubscriptionPricesForInvoiceMonthly
          ],
      },
    ],
    payload: JSON.stringify({
      month: parseInt(month),
      charge_id: generateOTP(),
      subscriptionType: `${month} month | Premium`,
      currency: paymentProviderConfig.activeProviderCurrency,
    }),
  };

  return invoice;
};

export const createDonationInvoice = (chat_id: number, amount: number) => {
  const invoice: NewInvoiceParameters = {
    provider_token: paymentProviderConfig.activeProviderToken,
    start_parameter: `donation-${chat_id}`,
    title: "Donation",
    description: "Donations will help to improve our services",
    currency: paymentProviderConfig.activeProviderCurrency,
    photo_url:
      "https://cdn.pixabay.com/photo/2021/04/09/11/01/donation-6164135_640.png",
    prices: [
      {
        label: `Donation`,
        amount: amount * 100,
      },
    ],
    payload: JSON.stringify({
      charge_id: generateOTP(),
      isDonation: true,
      subscriptionType: `Donation`,
      currency: paymentProviderConfig.activeProviderCurrency,
    }),
  };

  return invoice;
};

const invoiceDescriptionText = (month: string) => `
For ${month} month(s), you will get for each month(s): 
${botSubscriptionsLimitConfig.Premium.DAILY_MESSAGES_LIMIT} daily chat completions |
${botSubscriptionsLimitConfig.Premium.MONTHLY_IMAGES_LIMIT} monthly image generations |   
${botSubscriptionsLimitConfig.Premium.DAILY_VOICES_LIMIT} daily voice completions
`;
