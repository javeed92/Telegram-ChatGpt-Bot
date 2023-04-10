import {
  PremiumSubscriptionPricesMonthly,
  botSubscriptionsLimitConfig,
  channelLink,
} from "@/bot/config/defaults.config";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";
import { SessionData } from "@/types/bot/customContext";
import { ICharge } from "@/types/models";
import { fmt, bold, italic, link } from "telegraf/format";

export const startResponse = (
  username: string
) => fmt`Hi ${username}! Using this bot you will be able to interract with OpenAI products, and more.

What ${bold`models`} do I use? 

1. gpt-3.5-turbo.
2. whisper
3. text-davinci
4. and others ...


👀What can I do such as:

1. Copywriting and rewriting
2. Writing and editing code
3. Translation from any language
4. Parsing unstructured text and summarization
5. Chat Completions (with topics that remember the context, see /help)
6. ${bold`Image`} generation using fine-tuned model on Midjourney🦾
7. ${bold`Voice`} to completion feature🔥🔥🔥
8. ${bold`Voice`} to image feature🔥🔥🔥


Let's start the journey 🎉🎉🎉 for more visit ${link("@Channel", channelLink)}
`;

export const accountResponseText = (session: SessionData) => {
  return fmt`
Messages for today: ${bold`${session.messagesCount}`}/${bold`${
    botSubscriptionsLimitConfig[session.subscription].DAILY_MESSAGES_LIMIT
  }`}
Images for current month: ${bold`${session.imagesCount}`}/${bold`${
    botSubscriptionsLimitConfig[session.subscription].MONTHLY_IMAGES_LIMIT
  }`}
Voices for today: ${bold`${session.voiceCount}`}/${bold`${
    botSubscriptionsLimitConfig[session.subscription].DAILY_VOICES_LIMIT
  }`}
Current topic: ${bold`${session.currentTopic}`}
Total token usage : ${bold`${session.totalTokenUsage}`} ( 1000 token ~ 750 words )
  
Subscription: ${bold`${session.subscription}`}

${
  session.subscription === BotSubscription.FREE
    ? fmt`Try /premium to get more ${bold`Text, Voice and Image limits`}
With ${bold`Premium`}, you will get:

✅ ${bold`${botSubscriptionsLimitConfig.Premium.DAILY_MESSAGES_LIMIT}`} daily chat completions
✅ ${bold`${botSubscriptionsLimitConfig.Premium.MONTHLY_IMAGES_LIMIT}`} monthly image generations
✅ ${bold`${botSubscriptionsLimitConfig.Premium.DAILY_VOICES_LIMIT}`} daily voice completions
      `
    : ""
}
${
  session.subscription === BotSubscription.PREMIUM && session.premiumEndDate
    ? fmt`Your ${bold`Premium`} subscription will end on ${session.premiumEndDate.toDateString()}`
    : ""
}
      `;
};

export const emptyArgumentTopicText = `Please provide topic argument. 
Ex. '/set_topic Ocean' 
or '/set_topic Thesis School'`;

export const tooManyTopicArgsText = `Too many topics, please refactor your command`;

export const successTopicSetText = `Topic was set succesfully`;
export const successTopicsSetText = `Topics were set succesfully`;

export const getTopics = (session: any) => {
  let topics = `Topics: \n`;

  for (let topic of session.topics) {
    topics = topics.concat(`- ${topic}\n`);
  }

  return topics;
};

export const helpCommandResponse = fmt`Hi again👋
🐃 In order track the usage and 
account state tap /account

🦖 You can:  
/set_topic, 
/delete_topic, 
/checkout_topic

${italic`For example`} (/set_topic Ocean) and 
start conversation about Ocean

To switch between contexts 
tap /checkout_topic
then select one of your topic

🐡 Using /image commnd you can 
create whatever image that you can imagine

${italic`Example`} 
/image 3 monkeys playing on the moon...

🦑 To get a text response, you can also send voice messages
🐝 With /premium feature, one can also generate image via voice messages🔥🔥🔥
`;

export const voiceToImageTextPrompt =
  "Please send voice that describes image reply to this message";

export const premiumCommandResponseText = (
  activeCharge?: ICharge | null
) => fmt`
With ${bold`Premium`} subscription starting from ${
  PremiumSubscriptionPricesMonthly[1]
}
Monthly you will get:

✅ ${bold`${botSubscriptionsLimitConfig.Premium.DAILY_MESSAGES_LIMIT}`} daily chat completions
✅ ${bold`${botSubscriptionsLimitConfig.Premium.MONTHLY_IMAGES_LIMIT}`} monthly image generations
✅ ${bold`${botSubscriptionsLimitConfig.Premium.DAILY_VOICES_LIMIT}`} daily voice completions

⚡️✨ Extra feature Voice to Image also included in ${bold`Premium`} subscription

${
  activeCharge
    ? italic`Note: You have already active charge and additional subscription will prolong the period`
    : ""
}

Please select how many months do you want to subscribe:
`;
