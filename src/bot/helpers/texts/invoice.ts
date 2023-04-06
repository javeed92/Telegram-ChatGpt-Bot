import {
  PremiumSubscriptionPricesForInvoiceMonthly,
  botSubscriptionsLimitConfig,
} from "@/bot/config/defaults.config";
import environment from "@/config/environment";
import { ICharge } from "@/types/models";
import { generateOTP } from "@/utils/generateChargeIdentifier";
import { NewInvoiceParameters } from "telegraf/typings/telegram-types";

export const createInvoice = (month: string, activeInvoice?: ICharge) => {
  const invoice: NewInvoiceParameters = {
    provider_token: environment.PAYMENT_PROVIDER_TOKEN,
    start_parameter: `premium-${month}-month`,
    title: "Premium Subscription",
    description: invoiceDescriptionText(month),
    currency: "usd",
    photo_url: "https://imgtr.ee/images/2023/04/03/kO501.th.jpg",
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
      activeInvoice
    }),
  };

  return invoice;
};

const invoiceDescriptionText = (
  month: string
) => `Want to extend the limits? Then this subscription is good fit for you
For ${month} month(s), you will get for each month(s):

✅ ${botSubscriptionsLimitConfig.Premium.DAILY_MESSAGES_LIMIT} daily chat completions
✅ ${botSubscriptionsLimitConfig.Premium.MONTHLY_IMAGES_LIMIT} monthly image generations
✅ ${botSubscriptionsLimitConfig.Premium.DAILY_VOICES_LIMIT} daily voice completions
`;
