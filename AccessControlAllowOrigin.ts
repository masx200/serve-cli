import Koa from "koa";

export function AccessControlAllowOrigin(): Koa.Middleware {
    return async (ctx, next) => {
        ctx.response.set("Access-Control-Allow-Origin", "*");
        return next();
    };
}
