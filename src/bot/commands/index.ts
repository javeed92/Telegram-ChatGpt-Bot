import { Composer } from "telegraf";
import { startHandler } from "./start";
import customCommandHandlers from "./custom-commands";

const composer = new Composer();

composer.start(startHandler);
composer.use(customCommandHandlers);
// composer.help(helpHandler);

export default composer;
