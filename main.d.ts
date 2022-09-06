/// <reference types="node" />
import http from "http";
import http2 from "http2";
import { ParsedArgs } from "minimist";
export interface ServeOptions {
    path: string;
    host: string;
    port: number;
    ssl: boolean;
    sslKey: string;
    sslCert: string;
}
export declare function main(
    argv: Partial<ParsedArgs & ServeOptions>
): http.Server | http2.Http2SecureServer;
