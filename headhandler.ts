export function headhandler(): Koa.Middleware {
    return async (ctx, next) => {
        await next();
        if (ctx.method === "HEAD") {
            ctx.res.end();
        }
        return;
    };
}
import Koa from "koa";
