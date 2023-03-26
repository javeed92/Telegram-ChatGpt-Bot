import { Composer } from "telegraf";
import messageComposer from "./message-handlers";

const composer = new Composer();

composer.use(messageComposer)

export default composer
