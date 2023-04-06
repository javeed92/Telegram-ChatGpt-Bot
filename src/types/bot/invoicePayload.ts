import { ICharge } from "../models";

export interface InvoicePayload{
    month: number,
    charge_id: string,
    activeCharge: ICharge
}