import { format } from "winston";

const { combine, timestamp, colorize, printf, uncolorize } = format;

const Colorize = colorize();

const timeFormat = timestamp({
  format: "YYYY-MM-DD HH:mm:ss",
});

const message = printf((info) => {
  return Colorize.colorize(
    info.level,
    `${info.timestamp} - [${info.level.toUpperCase().padEnd(2)}] - ${JSON.stringify(info.message, null, 2)
    } ${info.level === "error"
      ? info.error
        ? " - " + info.error.message
        : ""
      : ""
    } ${info.level === "error"
      ? info.error
        ? "\n - " +
        info.stack?.substr(0, 1000) +
        "\n" +
        '\n - ' + info.error?.stack?.substr(0, 4000)
        : " - " + info.stack?.substr(0, 4000)
      : ""
    }`
  );
});

export const formatProduction = combine(timeFormat, message);

export const errorFormat = combine(
  format((info, opts) => {
    return info.level === "error" ? info : false;
  })(),
  uncolorize()
);
export const infoFormat = combine(
  format((info, opts) => {
    return info.level === "info" ? info : false;
  })(),
  uncolorize()
);
export const combineFormat = combine(
  format((info, opt) => {
    return info.level === 'debug' || 'info' || 'error' || 'warn' ? info : false;
  })(),
  uncolorize()
) 
