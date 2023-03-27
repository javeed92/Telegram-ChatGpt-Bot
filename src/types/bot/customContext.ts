import { Context } from "telegraf";

export interface SessionData {
	messagesCount: number;
    maxDailyMessages: number;
    currentTopic: string;
    topics: Array<string>;
    maxMonthlyImages: number;
    imagesResetDate: Date;
    imagesCount: number;
    subscription: string;
}

// Define your own context type
export interface MyContext extends Context {
	session?: SessionData;
}

