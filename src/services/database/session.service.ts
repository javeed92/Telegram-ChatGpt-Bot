import { ISessionData } from "@/types/models";
import Session from "@/models/session";
import { FilterQuery, UpdateQuery, UpdateWithAggregationPipeline } from "mongoose";
import { after } from "node:test";

export const getAllSession = async (query: any) => {
  try {
    const session = await Session.find();

    return session;
  } catch (error) {
    throw error;
  }
};

export const updateSessions = async (
  queryFilter: FilterQuery<ISessionData>,
  updates: UpdateWithAggregationPipeline | UpdateQuery<ISessionData>
) => {
  try {
    const sessions = await Session.updateMany(queryFilter, updates);
    return sessions;
  } catch (error) {
    throw error;
  }
};
