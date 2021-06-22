import koalogger from "koa-logger";
import { afterlogger } from "./afterlogger.js";
import { beforelogger } from "./beforelogger.js";

export const loggermiddles = [beforelogger(), afterlogger(), koalogger({})];
