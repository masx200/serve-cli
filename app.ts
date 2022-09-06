import Koa from "koa";
import { ParsedArgs } from "minimist";

import { loadcoremiddles } from "./loadcoremiddles.js";
import { loadloggermiddles } from "./loadloggermiddles.js";
import { ServeOptions } from "./main.js";
import { getpublicpath } from "./publicpath.js";

export { createApp };
function createApp(argv: Partial<ParsedArgs & ServeOptions>) {
    const app = new Koa();
    loadloggermiddles(app);
    loadcoremiddles(app, getpublicpath(argv), true);
    return app;
}
