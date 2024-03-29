import logger from "@/config/logger";
import { MyContext } from "@/types/bot/customContext";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";
import {
  freeMonthlyImagesLimitResponse,
  freeDailyMessageLimitResponse,
  freeDailyVoiceLimitResponse,
  premiumDailyVoiceLimitResponse,
  premiumMonthlyImagesLimitResponse,
  premiumDailyMessageLimitResponse,
} from "../helpers/texts/limitReachedResponses.texts";
import { robotChargeStickerFileId } from "../helpers/stickers";

export async function usageCheckForImage(
  ctx: MyContext,
  next: () => Promise<void>
) {
  logger.debug("Usage Check Middleware - usageCheckForImage");
  try {
    // Free limits check
    if (ctx.session?.subscription === BotSubscription.FREE) {
      if (ctx.session?.imagesCount! >= ctx.session?.maxMonthlyImages!) {
        return await ctx.reply(freeMonthlyImagesLimitResponse);
      }
    }

    // Premium limits check
    // Free limits check
    if (ctx.session?.subscription === BotSubscription.FREE) {
      if (ctx.session?.imagesCount! >= ctx.session?.maxMonthlyImages!) {
        return await ctx.reply(premiumMonthlyImagesLimitResponse);
      }
    }

    return await next();
  } catch (error) {
    throw error;
  }
}

export async function usageCheckForVoice(
  ctx: MyContext,
  next: () => Promise<void>
) {
  logger.debug("Usage Check Middleware - usageCheckForVoice");
  try {
    // Free limits check
    if (ctx.session.subscription === BotSubscription.FREE) {
      if (ctx.session.messagesCount >= ctx.session.maxDailyMessages) {
        logger.debug("FREE LIMIT VOICE REACHED");
        return await ctx.sendMessage(freeDailyVoiceLimitResponse);
      }
    }

    // Premium limits check
    if (ctx.session.subscription === BotSubscription.PREMIUM) {
      if (ctx.session.messagesCount! >= ctx.session.maxDailyMessages!) {
        return await ctx.sendMessage(premiumDailyVoiceLimitResponse);
      }
    }

    await next();
  } catch (error) {
    throw error;
  }
}

export async function usageCheckForText(
  ctx: MyContext,
  next: () => Promise<void>
) {
  logger.debug("Usage Check Middleware - usageCheckForText");
  try {
    // Free limits check
    if (ctx.session.subscription === BotSubscription.FREE) {
      logger.debug("FREE TEXT LIMIT CONDITION CHECK");
      if (ctx.session.messagesCount >= ctx.session.maxDailyMessages) {
        logger.debug("FREE TEXT LIMIT MEET");
        await ctx.sendSticker(robotChargeStickerFileId)
        return await ctx.reply(freeDailyMessageLimitResponse);
      }
    }

    // Premium limits check
    if (ctx.session.subscription === BotSubscription.FREE) {
      logger.debug("PREMIUM TEXT LIMIT CONDITION CHECK");
      if (ctx.session.messagesCount >= ctx.session.maxDailyMessages) {
        logger.debug("PREMIUM TEXT LIMIT MEET");
        await ctx.sendSticker(robotChargeStickerFileId)
        return await ctx.reply(premiumDailyMessageLimitResponse);
      }
    }

    await next();
  } catch (error) {
    throw error;
  }
}
