import { botConfig } from "@/config/environment";
import { BotSubscription } from "@/helpers/enums/botSubscription.enums";
import { SessionData } from "@/types/bot/customContext";
import { fmt, bold } from "telegraf/format";

export const startResponse = (username: string) => fmt`Hi ${username}! Using this bot you will be able to interract with OpenAI products, and more.

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
6. Image generation using DALL-E and fine-tuned model on Midjourney🦾
7. ${bold`Voice`} to completion feature🔥🔥🔥


Let's start the journey 🎉🎉🎉 for more visit @Channel
`

export const accountResponseText = (session: SessionData) => {
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

✅ ${bold`100`} daily chat completions
✅ ${bold`100`} monthly image generations
✅ ${bold`30`} daily voice completions
      `
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

🦖 You can /set_topic, /delete_topic, 
/checkout_topic 
For example (/set_topic Ocean) and 
start conversation about Ocean

To switch between contexts 
tap /checkout_topic and 
select one of your topic

🐡 Using /image_dall or /image_mj you can 
create whatever image that you can imagine

Example 
/image_mj 3 monkeys playing on the moon... ( same with /image_dall)

🦑 To get a text response, you can also send voice messages🐝
`