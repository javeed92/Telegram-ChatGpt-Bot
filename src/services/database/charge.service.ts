import ChargeModel from "@/models/charge";
import { ICharge } from "@/types/models";
import { FilterQuery } from "mongoose";

export const createCharge = async (payload: Partial<ICharge>) => {
  try {
    const charge = await ChargeModel.create(payload);
    return charge;
  } catch (error) {
    throw error;
  }
};

export const getCharge = async (filters: FilterQuery<ICharge>) => {
  try {
    console.log({filters})
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
      new: true
    });

    return charge;
  } catch (error) {
    throw error;
  }
};
