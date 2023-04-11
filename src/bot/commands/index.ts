import { Composer } from "telegraf";
import { helpHandler, startHandler } from "./start";
import customCommandHandlers from "./custom-commands";
import { MyContext } from "@/types/bot/customContext";

const composer = new Composer<MyContext>();

composer.start(startHandler);
composer.help(helpHandler);
composer.use(customCommandHandlers);

export default composer;
