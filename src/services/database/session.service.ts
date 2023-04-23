import { ISessionData } from "@/types/models";
import Session from "@/models/session";
import { FilterQuery, UpdateQuery, UpdateWithAggregationPipeline } from "mongoose";

export const getAllSessions = async (query: FilterQuery<ISessionData> = {}) => {
  try {
    const session = await Session.find(query);

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

