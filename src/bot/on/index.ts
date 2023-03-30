import { Composer } from "telegraf";
import messageComposer from "./textMessage";
import actionComposer from "./actions";
import voiceComposer from "./voice";

const composer = new Composer();

composer.use(messageComposer)
composer.use(actionComposer)
composer.use(voiceComposer)

export default composer
