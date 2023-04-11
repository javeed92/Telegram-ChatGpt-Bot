import winston from "winston";
import levels from "./levels";
import { errorFormat, formatProduction, infoFormat,combineFormat} from "./logFormat";
import color from "./color";

winston.addColors(color);
const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL,
  levels: levels,
});

logger.format = formatProduction;
logger.add(
  new winston.transports.File({
    filename: "app.log",
    level: "debug",
    format: infoFormat,
    maxsize: 5242880, //5mb,
    maxFiles: 15,
  })
);
logger.add(
  new winston.transports.File({
    filename: "combine.log",
    level: "info",
    format: combineFormat,
    maxsize: 5242880, //5mb,
    maxFiles: 15,
  })
);
logger.add(
  new winston.transports.File({
    // handleExceptions: true,
    filename: "error.log",
    level: "error",
    format: errorFormat,
    maxsize: 5242880, //5mb,
    maxFiles: 15,
  })
);
logger.add(
  new winston.transports.Console()
);

export default logger;
