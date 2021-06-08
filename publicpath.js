import path from "path";
import process from "process";
import { argv } from "./argv.js";
export const publicpath = argv.path || path.resolve(process.cwd());
