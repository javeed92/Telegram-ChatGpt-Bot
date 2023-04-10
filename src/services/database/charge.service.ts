import ChargeModel from "@/models/charge";
import { ICharge } from "@/types/models";
import { FilterQuery } from "mongoose";

export const createCharge = async (payload: Partial<ICharge>) => {
  try {
    const charge = await ChargeModel.findOneAndReplace(
      { charge_id: payload.charge_id, chat_id: payload.chat_id },
      payload,
      { upsert: true }
    );
    return charge;
  } catch (error) {
    throw error;
  }
};

export const getCharge = async (filters: FilterQuery<ICharge>) => {
  try {
    const charge = await ChargeModel.findOne(filters);
    return charge;
  } catch (error) {
    throw error;
  }
};

export const updateCharge = async (
  charge_id: string,
  payload: Partial<ICharge>
) => {
  try {
    const charge = await ChargeModel.findOneAndUpdate({ charge_id }, payload, {
      upsert: true,
      new: true,
    });

    return charge;
  } catch (error) {
    throw error;
  }
};
