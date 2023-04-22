import { IMessagesHistory } from "@/types/models";
import { escapeCodeBlock, splitText } from "./escapeMarkdown2";
import { MyContext } from "@/types/bot/customContext";

export const prepareChatcompletionMessages = (messages: IMessagesHistory[]) => {
  messages = messages.reverse()
  const formattedMessages = messages.map((mes) => {
    return {
      content: mes.text,
      role: mes.role || "user",
    };
  });

  return formattedMessages;
};

export // Util functions

async function sendCodeMessages(ctx: MyContext, text: string) {
  const { codeBlocks, parts } = splitText(text || "");

  for (let txt of parts) {
    if (!txt) continue;
    let cTxt: string | undefined;
    if ((cTxt = codeBlocks?.find((cb) => cb.includes(txt)))) {
      txt = escapeCodeBlock(cTxt);
      await ctx.replyWithMarkdownV2(txt);
    } else {
      await ctx.sendMessage(txt);
    }
  }
}
