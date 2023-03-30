import { Composer } from "telegraf";
import { helpHandler, startHandler } from "./start";
import customCommandHandlers from "./custom-commands";

const composer = new Composer();

composer.start(startHandler);
composer.help(helpHandler);
composer.use(customCommandHandlers);

export default composer;
