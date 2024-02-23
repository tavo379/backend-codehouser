import { createLogger, format, transports, addColors } from "winston";
import { fileURLToPath } from "url";

const { combine, printf, timestamp, colorize } = format;

const customLogger = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "white"
  },
};
// const enviroment = process.argv[2]; esto se removió para usar el .env
let logConfig;
if (process.env.NODE_ENV === "dev") {
  logConfig = {
    levels: customLogger.levels,
    level: "debug",
    format: combine(
      timestamp({
        format: "MM-DD-YYYY HH:mm:ss",
      }),
      colorize(addColors(customLogger.colors)),
      printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`)
    ),
    transports: [new transports.Console()],
  };
} else {
  logConfig = {
    levels: customLogger.levels,
    level: "info",
    format: combine(
      timestamp({
        format: "MM-DD-YYYY HH:mm:ss",
      }),
      colorize(addColors(customLogger.colors)),
      printf((info) => `${info.level} | ${info.timestamp} | ${info.message}`)
    ),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: `${fileURLToPath(import.meta.url)}/../logs/errors.log`,
        level: "info",
      }),
    ],
  };
}


export const logger = createLogger(logConfig);
