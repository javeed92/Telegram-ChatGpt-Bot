import { Context } from "telegraf";

interface SessionData {
	messageCount: number;
    maxMessage: number;
    currentTopic?: string;
}

// Define your own context type
export interface MyContext extends Context {
	session?: SessionData;
}

