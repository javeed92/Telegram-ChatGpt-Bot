import { Document } from "mongoose";
import { ChatCompletionRequestMessageRoleEnum } from "openai";

export interface IMessagesHistory extends Document {
  chat_id: string;
  chat_topic?: string
  text: string;
  date: Date;
  role: ChatCompletionRequestMessageRoleEnum,
}

export interface IChat extends Document {
  type: string;
  username: string;
  first_name: string;
  id: number;
  messages: Array<IMessagesHistory>;
}
