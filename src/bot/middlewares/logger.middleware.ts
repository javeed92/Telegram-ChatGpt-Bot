import logger from "@/config/logger";
import { MyContext } from "@/types/bot/customContext";


export async function updateLoggerMiddleware(
  ctx: MyContext,
  next: () => Promise<void>
) {
  try {
    logger.info(ctx.update)
    logger.info(ctx.session)
    await next()
  } catch (error) {
    throw error;
  }
}