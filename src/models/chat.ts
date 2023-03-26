import { IChat } from "@/types/models";
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    id: Number,
    first_name: String,
    username: String,
    type: String,
  },
  { toJSON: { virtuals: true } }
);

chatSchema.virtual("messages", {
  ref: "messages_history",
  localField: "id",
  foreignField: "chat_id",
  justOne: false,
});

export default mongoose.model<IChat>("chat", chatSchema);
