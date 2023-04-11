import { ISessionData } from "@/types/models";
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  key: String,
  session: Object,
});

export default mongoose.model<ISessionData>("telegraf-session", sessionSchema);
