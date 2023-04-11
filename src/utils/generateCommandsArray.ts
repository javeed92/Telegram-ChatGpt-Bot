import logger from "@/config/logger";
import {
  BotCommandDescriptionList,
  BotCommandList,
} from "@/helpers/enums/botCommand.enums";
import { BotCommand } from "telegraf/typings/core/types/typegram";

export const generateCommandsArray = () => {
  const commands = Object.entries(BotCommandList).reduce((acc: BotCommand[], [key, value]) => {
    if (value !== 'start') {
      acc.push({
        command: value,
        description:
          BotCommandDescriptionList[
            key as keyof typeof BotCommandDescriptionList
          ],
      });
    }
    return acc;
  }, []);

    // logger.debug({ commands });
  return commands;
};
