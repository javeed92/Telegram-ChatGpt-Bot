import {
  topicToCheckout,
  topicToDelete,
} from "@/bot/helpers/markups/topic.markup";
import logger from "@/config/logger";
import createAccountResponseHelper from "@/helpers/createAccountResponse.helper";
import { BotCommandList } from "@/helpers/enums/botCommand.enums";
import {
  emptyArgumentTopicText,
  successTopicSetText,
  successTopicsSetText,
  tooManyTopicArgsText,
} from "@/helpers/texts/commandResponse.texts";
import { createImage } from "@/openai-api/images";
import { generateImage } from "@/replicate-api/openjourney-model";
import { MyContext } from "@/types/bot/customContext";
import { Composer } from "telegraf";

const composer = new Composer<MyContext>();

composer.command(BotCommandList.ACCOUNT, async (ctx) => {
  try {
    const accountReply = createAccountResponseHelper(ctx.session!);
    return await ctx.reply(accountReply);
  } catch (error) {
    throw error;
  }
});

composer.command(BotCommandList.CHECKOUT_TOPIC, async (ctx) => {
  try {
    await ctx.reply(
      "Checkout one of the topics provided below:",
      topicToCheckout(ctx.session?.topics || [])
    );
  } catch (error) {
    throw error;
  }
});

composer.command(BotCommandList.DELETE_TOPIC, async (ctx) => {
  try {
    await ctx.reply(
      "Delete one of the topics provided below:",
      topicToDelete(ctx.session?.topics || [])
    );
  } catch (error) {
    throw error;
  }
});

composer.command(BotCommandList.DONATIONS, async (ctx) => {
  try {
    // SHOULD INTEGRATE PAYMENT PROVIDER
  } catch (error) {
    throw error;
  }
});

composer.command(BotCommandList.IMAGE_DALLE, async (ctx) => {
  console.dir(ctx.update, {depth: Infinity})
  try {
    const prompt = ctx.message.text.split(" ").slice(1).join(" ");

    if (!prompt)
      return await ctx.sendMessage(
        "Please enter a descriptive prompt to generate image."
      );
    const msg = await ctx.sendMessage("Processing");
      
    // Send request to OpenAI to generate image
    const url =  await createImage(prompt, ctx.message.from.username);

    if(url){
      ctx.session!.imagesCount ++
      logger.debug(url)
      await ctx.deleteMessage(msg.message_id);
      return await ctx.sendPhoto({ url });
    }

    await ctx.deleteMessage(msg.message_id);
    return ctx.sendMessage('Something went wrong, please try again later')
  } catch (error) {
    throw error;
  }
});

composer.command(BotCommandList.IMAGE_MIDJ, async (ctx) => {
  console.dir(ctx.update, {depth: Infinity})
  try {
    const prompt = ctx.message.text.split(" ").slice(1).join(" ");

    if (!prompt)
      return await ctx.sendMessage(
        "Please enter a descriptive prompt to generate image."
      );
    const msg = await ctx.sendMessage("Processing");
      
    // Send request to Replicate to generate image
    const url =  await generateImage(prompt);

    if(url){
      ctx.session!.imagesCount ++
      logger.debug(url)
      await ctx.deleteMessage(msg.message_id);
      return await ctx.sendPhoto({ url });
    }

    await ctx.deleteMessage(msg.message_id);
    return ctx.sendMessage('Something went wrong, please try again later')
  } catch (error) {
    throw error;
  }
});

composer.command(BotCommandList.PREMIUM, async (ctx) => {
  try {
    await ctx.reply(BotCommandList.IMAGE_DALLE);
  } catch (error) {
    throw error;
  }
});

composer.command(BotCommandList.SET_TOPIC, async (ctx) => {
  try {
    const args = ctx.message.text.split(" ").slice(1);

    if (!args.length) return await ctx.reply(emptyArgumentTopicText);

    if (args.length > 2) return await ctx.reply(tooManyTopicArgsText);

    for (const arg of args) {
      if (!ctx.session?.topics.includes(arg)) ctx.session?.topics.push(arg);
    }

    return await ctx.reply(
      args.length === 1 ? successTopicSetText : successTopicsSetText
    );
  } catch (error) {
    throw error;
  }
});

composer.command(BotCommandList.TERMS, async (ctx) => {
  try {
    await ctx.reply(BotCommandList.IMAGE_DALLE);
  } catch (error) {
    throw error;
  }
});

export default composer;
