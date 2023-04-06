import { Markup } from "telegraf";

export const InvoiceReplyOptions = Markup.inlineKeyboard([
	Markup.button.pay("💸 Buy"),
	Markup.button.url("❤️", "http://telegraf.js.org"),
]);