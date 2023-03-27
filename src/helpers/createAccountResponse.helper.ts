import { SessionData } from "@/types/bot/customContext";

export default (session: SessionData) => {
  let topics = `Topics: \n`;
  
  for (let topic of session.topics!) {
    topics = topics.concat(`- ${topic}\n`);
  }

  return `
${topics}
Messages for today: ${session.messagesCount}
Images for current month: ${session.imagesCount}
Current Topic (Sub chat): ${session.currentTopic}
    `;
};
