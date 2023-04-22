import { Message } from "telegraf/typings/core/types/typegram";
import { NarrowedCtxObjectMessage, SessionData } from "../bot/customContext";

export interface IMessageQueuePayload {
    message: NarrowedCtxObjectMessage
    msgToEdit: Message.TextMessage
    session: SessionData
}