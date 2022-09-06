import { ParsedArgs } from "minimist";
import path from "path";
import process from "process";
import { ServeOptions } from "./main";

// import { argv } from "./argv.js";

export function getpublicpath(argv: Partial<ParsedArgs & ServeOptions>) {
    const publicpath = argv.path || path.resolve(process.cwd());
    return publicpath;
}
