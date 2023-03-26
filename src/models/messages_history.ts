import { Schema, model } from "mongoose";

const MessageHistorySchema = new Schema({
  chat_id: String,
  chat_topic: String,
  text: String,
  date: Date,
  role: String,
});

export default model('messages_history', MessageHistorySchema)
