import { loggermiddles } from "./loggermiddles.js";
export function loadloggermiddles(app) {
    loggermiddles.forEach((middle) => {
        app.use(middle);
    });
}
//# sourceMappingURL=loadloggermiddles.js.map
