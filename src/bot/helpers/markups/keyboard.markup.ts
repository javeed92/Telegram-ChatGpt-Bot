import { Markup } from "telegraf"

export const startupKeyboard = () => {
    return Markup.keyboard([
        ["📸 Voice to image", "💵 Donation"], // Row1 with 2 buttons
        ["✅ Premium Subscription", "📞 Feedback"], // Row2 with 2 buttons
    ]).oneTime().resize()
}