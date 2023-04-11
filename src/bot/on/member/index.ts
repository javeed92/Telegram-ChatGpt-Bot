import { Composer } from "telegraf";
import { MyContext } from "@/types/bot/customContext";
import logger from "@/config/logger";
import { createTelegramChat } from "@/services/database/chat.service";
import environment from "@/config/environment";
import { memberStatusUpdateNotif } from "@/bot/helpers/texts/memberNotifucation.text";

const composer = new Composer<MyContext>();

composer.on("my_chat_member", async (ctx) => {
  try {
    const chat = await createTelegramChat({
      ...ctx.myChatMember.chat,
      status: ctx.myChatMember.new_chat_member.status,
    });

    if (chat)
      return await ctx.telegram.sendMessage(
        environment.HELP_GROUP_ID,
        memberStatusUpdateNotif(chat)
      );
  } catch (error) {
    throw error;
  }
});

export default composer;
