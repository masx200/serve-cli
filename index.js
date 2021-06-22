import Koa from "koa";
import { loadcoremiddles } from "./loadcoremiddles.js";
import { loggermiddles } from "./loggermiddles.js";
import { publicpath } from "./publicpath.js";

const app = new Koa();

loggermiddles.forEach((middle) => {
    app.use(middle);
});
loadcoremiddles(app, publicpath);

export { loadcoremiddles };

export { app };
