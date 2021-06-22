import cors from "@koa/cors";
import Koa from "koa";
import compress from "koa-compress";
import conditional from "koa-conditional-get";
import streametag from "@masx200/koa-stream-etag";
import koaetag from "koa-etag";
import logger from "koa-logger";
import range from "koa-range";
import servestatic from "koa-static";

import serveIndex from "koa2-serve-index";
import { publicpath } from "./publicpath.js";

const app = new Koa();
app.use(async (ctx, next) => {
    ctx.response.set("Access-Control-Allow-Origin", "*");
    return next();
});
app.use(async (ctx, next) => {
    const { method, url, header } = ctx.request;
    console.log(">>", method, url, header);
    return next();
});
app.use(async (ctx, next) => {
    await next();
    const { method, url } = ctx.request;
    const { status } = ctx.response;

    console.log(">>", method, url, ">", status);
    return;
});
app.use(async (ctx, next) => {
    await next();
    if (ctx.method === "HEAD") {
        ctx.res.end();
    }
    return;
});
app.use(range);
app.use(cors({}));
app.use(logger({}));
app.use(conditional());

app.use(compress({}));
app.use(streametag({}));
app.use(koaetag({}));
app.use(servestatic(publicpath, { hidden: true }));

app.use(serveIndex(publicpath, { hidden: true }));
export { app };
