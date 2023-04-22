import Queue from "bull";

const defaultRedisOptions = "redis://default:3c8c543f539a4c6bb3a97449200df057@eu2-cuddly-sheep-30703.upstash.io:30703"

export const messageQueue = new Queue("message-queue", {
  redis: defaultRedisOptions,
  prefix: "sa"
});

export const voiceQueue = new Queue("voice-queue", {
  redis: defaultRedisOptions,
});
