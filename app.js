import Koa from "koa";
import { loadcoremiddles } from "./loadcoremiddles.js";
import { loadloggermiddles } from "./loadloggermiddles.js";
import { getpublicpath } from "./publicpath.js";
export { createApp };
function createApp(argv) {
    const app = new Koa();
    loadloggermiddles(app);
    loadcoremiddles(app, getpublicpath(argv), true);
    return app;
}
//# sourceMappingURL=app.js.map
