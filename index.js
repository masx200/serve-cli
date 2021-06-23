import Koa from "koa";
import { loadcoremiddles } from "./loadcoremiddles.js";
import { loadloggermiddles } from "./loadloggermiddles.js";
import { publicpath } from "./publicpath.js";

const app = new Koa();

loadloggermiddles(app);
loadcoremiddles(app, publicpath, true);

export { loadcoremiddles, loadloggermiddles };

export { app };
