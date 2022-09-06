import minimist from "minimist";
import process from "process";

export const argv = minimist(process.argv.slice(2));
