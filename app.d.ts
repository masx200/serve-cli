import Koa from "koa";
import { ParsedArgs } from "minimist";
import { ServeOptions } from "./main.js";
export { createApp };
declare function createApp(
    argv: Partial<ParsedArgs & ServeOptions>
): Koa<Koa.DefaultState, Koa.DefaultContext>;
