import { DefaultContext, DefaultState } from "koa";

import { loggermiddles } from "./loggermiddles.js";

export function loadloggermiddles(
    app: import("koa")<DefaultState, DefaultContext>
) {
    loggermiddles.forEach((middle) => {
        app.use(middle);
    });
}
