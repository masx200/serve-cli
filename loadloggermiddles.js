import { loggermiddles } from "./loggermiddles.js";

export function loadloggermiddles(app) {
    loggermiddles.forEach((middle) => {
        app.use(middle);
    });
}
