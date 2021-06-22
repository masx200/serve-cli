export function beforelogger() {
    return async (ctx, next) => {
        const { method, url, header } = ctx.request;
        console.log(">>", method, url, header);
        return next();
    };
}
