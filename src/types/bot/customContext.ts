import { BotSubscription } from "@/helpers/enums/botSubscription.enums";
import { Context, NarrowedContext } from "telegraf";
import { Message, Update } from "telegraf/typings/core/types/typegram";

export interface SessionData {
  messagesCount: number;
  maxDailyMessages: number;
  currentTopic: string;
  topics: Array<string>;
  maxMonthlyImages: number;
  imagesResetDate: Date;
  imagesCount: number;
  maxDailyVoices: number;
  voiceCount: number ,
  subscription: BotSubscription;
}

// Define your own context type
export interface MyContext extends Context {
  session: SessionData;
}

export interface NarrowedCtxObject {
  message: Update.New & Update.NonChannel & Message.TextMessage;
  update_id: number;
}

export interface INarrowedMyContext extends NarrowedContext<MyContext, NarrowedCtxObject> {}
