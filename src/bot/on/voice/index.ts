import { Composer } from "telegraf";
import { message } from "telegraf/filters";
import { MyContext } from "@/types/bot/customContext";
import logger from "@/config/logger";

const composer = new Composer<MyContext>();

composer.on(message("voice"), async (ctx) => {
  try {

  } catch (error: any) {
    throw error;
  }
});

export default composer;
