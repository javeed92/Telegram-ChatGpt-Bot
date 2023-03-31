import { Composer } from "telegraf";
import messageComposer from "./textMessage";
import actionComposer from "./actions";
import voiceComposer from "./voice";
import { MyContext } from "@/types/bot/customContext";

const composer = new Composer<MyContext>();

composer.use(messageComposer)
composer.use(actionComposer)
composer.use(voiceComposer)

export default composer
