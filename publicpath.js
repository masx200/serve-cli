import path from "path";
import process from "process";
// import { argv } from "./argv.js";
export function getpublicpath(argv) {
    const publicpath = argv.path || path.resolve(process.cwd());
    return publicpath;
}
//# sourceMappingURL=publicpath.js.map
