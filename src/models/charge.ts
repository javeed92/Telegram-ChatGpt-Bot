import { ICharge } from "@/types/models";
import mongoose from "mongoose";

const chargeSchema = new mongoose.Schema({
    charge_id: String,
    status: Number,
    subscription_type: String,
    amount: Number,
    chat_id: Number,
    telegram_payment_charge_id: String,
    provider_payment_charge_id: String,
    date: Date,
    isProlong: Boolean,
    period_ends: Date
});

export default mongoose.model<ICharge>("charge", chargeSchema);
