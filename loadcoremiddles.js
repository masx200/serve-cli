import cors from "@koa/cors";
import range from "@masx200/koa-range";
import streametag from "@masx200/koa-stream-etag";
import compress from "koa-compress";
import conditional from "koa-conditional-get";
import koaetag from "koa-etag";
import servestatic from "koa-static";
import serveIndex from "koa2-serve-index";
import { AccessControlAllowOrigin } from "./AccessControlAllowOrigin.js";
import { headhandler } from "./headhandler.js";

export function loadcoremiddles(app, publicpath, index = true) {
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
    const staticmiddle = servestatic(publicpath, { hidden: true });
    const indexmiddle = serveIndex(publicpath, { hidden: true });
    if (index) {
        app.use(staticmiddle);

        app.use(indexmiddle);
    } else {
        app.use(indexmiddle);
        app.use(staticmiddle);
    }
}
