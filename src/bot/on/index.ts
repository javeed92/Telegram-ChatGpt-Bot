import { Composer } from "telegraf";
import messageComposer from "./textMessage";
import actionComposer from "./actions";

const composer = new Composer();

composer.use(messageComposer)
composer.use(actionComposer)

export default composer
