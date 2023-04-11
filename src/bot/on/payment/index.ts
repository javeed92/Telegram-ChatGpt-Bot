import { Composer } from "telegraf";
import { message } from "telegraf/filters";
import { MyContext } from "@/types/bot/customContext";
import {
  createCharge,
  getCharge,
  updateCharge,
} from "@/services/database/charge.service";
import { InvoicePayload } from "@/types/bot/invoicePayload";
import { ChargeStatus } from "@/helpers/enums/chargeStatus.enums";
import { ICharge } from "@/types/models";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";
import { getSpesifiedMonthLaterDate } from "@/utils/date.utils";
import { botSubscriptionsLimitConfig } from "@/bot/config/defaults.config";
import { accountResponseText } from "@/bot/helpers/texts/commandResponse.texts";
import logger from "@/config/logger";

const composer = new Composer<MyContext>();

composer.on("pre_checkout_query", async (ctx) => {
  try {
    const payload: InvoicePayload = JSON.parse(
      ctx.preCheckoutQuery.invoice_payload
    );

    // Create charge
    const chargePayload: Partial<ICharge> = {
      charge_id: payload.charge_id,
      chat_id: ctx.preCheckoutQuery.from.id,
      status: ChargeStatus.PENDING,
      subscription_type: payload.subscriptionType,
      currency: payload.currency,
      isDonation: payload.isDonation,
      amount: ctx.preCheckoutQuery.total_amount,
      date: new Date(),
    };

    await createCharge(chargePayload);
    logger.info(`Charge created: ${JSON.stringify(chargePayload,null,2)}`)

    await ctx.answerPreCheckoutQuery(true);
    logger.info(`Precheckout answered: true`)
  } catch (error) {
    await ctx.answerPreCheckoutQuery(
      false,
      "Cannot operate payment for now, please try again later"
    );
    throw error;
  }
});

composer.on(message("successful_payment"), async (ctx, next) => {
  try {
    const payload: InvoicePayload = JSON.parse(
      ctx.message.successful_payment.invoice_payload
    );

    // Premium subs. we call next middleware
    if(!payload.isDonation){
      return await next()
    }

    await ctx.sendMessage('Thanks for your donation!')

    // UPDATE CHARGE on success
    const chargePayload: Partial<ICharge> = {
      telegram_payment_charge_id:
        ctx.message.successful_payment.telegram_payment_charge_id,
      provider_payment_charge_id:
        ctx.message.successful_payment.provider_payment_charge_id,
      status: ChargeStatus.PAID,
      date: new Date(ctx.message.date * 1000)
    };

    await updateCharge(payload.charge_id, chargePayload);

  } catch (error) {
    throw error;
  }
});

composer.on(message("successful_payment"), async (ctx) => {
  try {
    const payload: InvoicePayload = JSON.parse(
      ctx.message.successful_payment.invoice_payload
    );

    const activeCharge = await getCharge({ chat_id: ctx.message.from.id, status: ChargeStatus.ACTIVE });

    let period_ends: Date;

    //Already has active subsc.
    if (activeCharge) {
      // get new period to end subscription
      period_ends = getSpesifiedMonthLaterDate(
        payload.month,
        activeCharge.period_ends
      );
      // Cancel current subcription and add remainin time to new one
      await updateCharge(activeCharge.charge_id, {
        status: ChargeStatus.CANCELED
      });
    } else {
      period_ends = getSpesifiedMonthLaterDate(payload.month);
    }

    const chargePayload: Partial<ICharge> = {
      telegram_payment_charge_id:
        ctx.message.successful_payment.telegram_payment_charge_id,
      provider_payment_charge_id:
        ctx.message.successful_payment.provider_payment_charge_id,
      status: ChargeStatus.ACTIVE,
      date: new Date(ctx.message.date * 1000),
      period_ends,
    };

    if(activeCharge){
      chargePayload.isProlong = true
    }

    const charge = await updateCharge(payload.charge_id, chargePayload);

    // Switching to Premium subscription
    ctx.session.subscription = BotSubscription.PREMIUM;
    ctx.session.premiumEndDate = period_ends;
    ctx.session.maxDailyMessages =
      botSubscriptionsLimitConfig.Premium.DAILY_MESSAGES_LIMIT;
    ctx.session.maxDailyVoices =
      botSubscriptionsLimitConfig.Premium.DAILY_VOICES_LIMIT;
    ctx.session.maxMonthlyImages =
      botSubscriptionsLimitConfig.Premium.MONTHLY_IMAGES_LIMIT;

    await ctx.sendMessage(
      `Successfully subscribed to Premium for ${
        activeCharge ? "additional" : ""
      } ${payload.month} month(s)
In case of problem, reach admin @admin. 
ID - ${charge.charge_id}
Transaction ID - ${charge.telegram_payment_charge_id}`
    );

    await ctx.sendMessage(accountResponseText(ctx.session));
  } catch (error) {
    throw error;
  }
});

export default composer;
