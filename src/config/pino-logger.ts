import type { Params } from "nestjs-pino";

//
const pinoOptions: Params = {
  pinoHttp: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
    autoLogging: false,
  },
};

//
export default pinoOptions;
