import { Document } from "mongoose";
import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { SessionData } from "../bot/customContext";
import { ChargeStatus } from "@/helpers/enums/chargeStatus.enums";


/****************  Messages ************ */
export interface IMessagesHistoryDocument extends Document {
  chat_id: string;
  chat_topic?: string;
  text: string;
  date?: Date;
  role: ChatCompletionRequestMessageRoleEnum;
}

export interface IMessagesHistory
  extends Pick<
    IMessagesHistoryDocument,
    "chat_id" | "chat_topic" | "text" | "date" | "role"
  > {}

export interface ICreateMessagesHistory
  extends Omit<IMessagesHistory, "chat_id | chat_topic"> {}

/********************   Chat  **** *********** */
export interface IChatDocument extends Document {
  type: string;
  username: string;
  first_name: string;
  id: number;
  status: string;
  messages: Array<IMessagesHistory>;
}

export interface IChat {
  type: string;
  username?: string;
  first_name?: string;
  id: number;
  status: string;
  messages?: Array<IMessagesHistory> | [];
}

export interface IChatCreate {
  type: string;
  username?: string;
  first_name?: string;
  id: number;
  status?: string;
}

/************** Session ************** */
export interface ISessionData extends Document {
  key: string;
  session: SessionData;
}

export interface ISessionDataRaw{
  key: string;
  session: SessionData;
}

export interface ISessionDataUpdate{
  key?: string;
  session?: Partial<SessionData>;
}

/**************** Charges ****************** */

export interface ICharge {
  charge_id: string,
  status: ChargeStatus,
  subscription_type: string,
  amount: number,
  chat_id: number,
  telegram_payment_charge_id: string,
  provider_payment_charge_id: string,
  date: Date,
  isProlong: Boolean,
  isDonation: Boolean,
  currency: string
  period_ends: Date
}