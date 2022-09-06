export function beforelogger(): Koa.Middleware {
    return async (ctx, next) => {
        const { method, url, header } = ctx.request;
        console.log(">>", method, url, header);
        return next();
    };
}
import Koa from "koa";
