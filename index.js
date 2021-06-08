import cors from "@koa/cors";

import Koa from "koa";
import compress from "koa-compress";
import conditional from "koa-conditional-get";
import etag from "koa-etag";

import logger from "koa-logger";
import servestatic from "koa-static";
import serveIndex from "koa2-serve-index";
import path from "path";
import process from "process";
const app = new Koa();
const publicpath = path.resolve(process.cwd());

app.use(cors({}));
app.use(logger({}));
app.use(conditional());
app.use(etag({}));
app.use(compress({}));
app.use(servestatic(publicpath, { hidden: true }));

app.use(serveIndex(publicpath, { hidden: true }));
export { app };
