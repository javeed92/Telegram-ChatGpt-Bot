import logger from "@/config/logger";
import {
  BotCommandDescriptionList,
  BotCommandList,
} from "@/helpers/enums/botCommand.enums";

export const generateCommandsArray = () => {
  const commands = Object.entries(BotCommandList).map(([key, value]) => ({
    command: value,
    description:
      BotCommandDescriptionList[key as keyof typeof BotCommandDescriptionList],
  }));

//   logger.debug({ commands });
  return commands;
};
