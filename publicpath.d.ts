import { ParsedArgs } from "minimist";
import { ServeOptions } from "./main";
export declare function getpublicpath(
    argv: Partial<ParsedArgs & ServeOptions>
): string;
