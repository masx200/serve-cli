import cors from "@koa/cors";
import range from "@masx200/koa-range";
import streametag from "@masx200/koa-stream-etag";
import Koa from "koa";
import compress from "koa-compress";
import conditional from "koa-conditional-get";
import koaetag from "koa-etag";
import servestatic from "koa-static";
import serveIndex from "koa2-serve-index";
import { AccessControlAllowOrigin } from "./AccessControlAllowOrigin.js";
import { headhandler } from "./headhandler.js";
import { loggermiddles } from "./loggermiddles.js";
import { publicpath } from "./publicpath.js";

const app = new Koa();
app.use(AccessControlAllowOrigin());
// app.use(beforelogger());
// app.use(afterlogger());
app.use(headhandler());
app.use(range);
app.use(cors({}));
// app.use(logger({}));
app.use(conditional());

app.use(compress({}));
app.use(streametag({}));
app.use(koaetag({}));
app.use(servestatic(publicpath, { hidden: true }));

app.use(serveIndex(publicpath, { hidden: true }));

export { app };
loggermiddles.forEach((middle) => {
    app.use(middle);
});
