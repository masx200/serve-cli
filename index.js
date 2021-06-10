import cors from "@koa/cors";
import Koa from "koa";
import compress from "koa-compress";
import conditional from "koa-conditional-get";
import streametag from "@masx200/koa-stream-etag";
import etag from "koa-etag";
import logger from "koa-logger";
import range from "koa-range";
import servestatic from "koa-static";

import serveIndex from "koa2-serve-index";
import { publicpath } from "./publicpath.js";

const app = new Koa();
app.use(range);
app.use(cors({}));
app.use(logger({}));
app.use(conditional());
app.use(streametag({}));
app.use(compress({}));
app.use(etag({}));
app.use(servestatic(publicpath, { hidden: true }));

app.use(serveIndex(publicpath, { hidden: true }));
export { app };
