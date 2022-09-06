import Koa from "koa";

export function afterlogger(): Koa.Middleware {
    return async (ctx, next) => {
        await next();
        const { method, url } = ctx.request;
        const { status } = ctx.response;

        console.log(">>", method, url, ">", status);
        return;
    };
}
