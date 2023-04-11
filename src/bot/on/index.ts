import { Composer } from "telegraf";
import { MyContext } from "@/types/bot/customContext";
import messageComposer from "./textMessage";
import actionComposer from "./actions";
import voiceComposer from "./voice";
import paymentComposer from "./payment";
import memberComposer from "./member";

const composer = new Composer<MyContext>();

composer.use(memberComposer)

composer.use(messageComposer)
composer.use(actionComposer)
composer.use(voiceComposer)

composer.use(paymentComposer)

export default composer
