import process from "process";
import minimist from "minimist";

export const argv = minimist(process.argv.slice(2));
