import { botConfig } from "@/config/environment";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";
import { SessionData } from "@/types/bot/customContext";
import { fmt, bold } from "telegraf/format";

export default (session: SessionData) => {
  return fmt`
Messages for today: ${bold`${session.messagesCount}`}/${bold`${
  botConfig[session.subscription].DAILY_MESSAGES_LIMIT
}`}
Images for current month: ${bold`${session.imagesCount}`}/${bold`${
  botConfig[session.subscription].MONTHLY_IMAGES_LIMIT
}`}
Voices for today: ${bold`${session.voiceCount}`}/${bold`${
    botConfig[session.subscription].DAILY_VOICES_LIMIT
  }`}
Current topic: ${bold`${session.currentTopic}`}


Subscription: ${bold`${session.subscription}`}


${
  session.subscription === BotSubscription.FREE &&
  fmt`Try /premium to get more ${bold`Text, Voice and Image limits`}
    With ${bold`Premium`}, you will get:
✅ ${bold`100`} daily chat compilations
✅ ${bold`100`} monthly image generations
✅ ${bold`30`} daily voice compilations
    `
}
    `;
};

export const a = (session: any) => {
  let topics = `Topics: \n`;

  for (let topic of session.topics) {
    topics = topics.concat(`- ${topic}\n`);
  }
}
