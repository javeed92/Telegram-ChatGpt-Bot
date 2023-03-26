import { BotCommandList } from "@/helpers/enums/botCommand.enums";
import { Composer } from "telegraf";

const composer = new Composer();

composer.command(BotCommandList.ACCOUNT, async (ctx) => {
  try {
    await ctx.reply(BotCommandList.ACCOUNT);
  } catch (error) {
    throw error;
  }
});
composer.command(BotCommandList.DELETE_TOPIC, async (ctx) => {
  try {
    await ctx.reply(BotCommandList.DELETE_TOPIC);
  } catch (error) {
    throw error;
  }
});
composer.command(BotCommandList.DONATIONS, async (ctx) => {
  try {
    await ctx.reply(BotCommandList.DONATIONS);
  } catch (error) {
    throw error;
  }
});
composer.command(BotCommandList.IMAGE, async (ctx) => {
  try {
    await ctx.reply(BotCommandList.IMAGE);
  } catch (error) {
    throw error;
  }
});

export default composer;
