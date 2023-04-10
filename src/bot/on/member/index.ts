import { Composer } from "telegraf";
import { MyContext } from "@/types/bot/customContext";
import logger from "@/config/logger";
import { createTelegramChat } from "@/services/database/chat.service";
import environment from "@/config/environment";
import { memberStatusUpdateNotif } from "@/bot/helpers/texts/memberNotifucation.text";

const composer = new Composer<MyContext>();

composer.on("my_chat_member", async (ctx) => {
  logger.info(ctx.myChatMember);
  try {
    if (ctx.myChatMember.new_chat_member.status === "member") {
      const chat = await createTelegramChat({
        ...ctx.myChatMember.chat,
        status: "member",
      });

      if (chat)
        return await ctx.telegram.sendMessage(
          environment.ERROR_REPORT_CHAT_ID,
          memberStatusUpdateNotif(chat)
        );
    }

    if (ctx.myChatMember.new_chat_member.status === "kicked") {
      const chat = await createTelegramChat({
        ...ctx.myChatMember.chat,
        status: "kicked",
      });

      if (chat)
      return await ctx.telegram.sendMessage(
        environment.ERROR_REPORT_CHAT_ID,
        memberStatusUpdateNotif(chat)
      );
    }
  } catch (error) {
    throw error;
  }
});

export default composer;
