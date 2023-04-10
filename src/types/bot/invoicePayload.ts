import { PaymentProviderCurrency } from "@/bot/config/defaults.config";
import { ICharge } from "../models";

export interface InvoicePayload{
    month?: number,
    charge_id: string,
    activeCharge?: ICharge,
    isDonation?: Boolean,
    subscriptionType: string,
    currency: PaymentProviderCurrency
}