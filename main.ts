import fs from "fs";
import http from "http";
import http2 from "http2";
import { ParsedArgs } from "minimist";
import process from "process";
import { createApp } from "./app.js";
import { showhelp } from "./showhelp.js";
import { selfSignedKey, selfSignedCert } from "./selfSignedKey.js";
export interface ServeOptions {
    path: string;
    host: string;
    port: number;
    ssl: boolean;
    sslKey: string;
    sslCert: string;
}
export function main(argv: Partial<ParsedArgs & ServeOptions>) {
    console.log("serve-cli");
    if (argv.help || argv.h) {
        showhelp();
    }
    const config = {
        path: argv.path || argv.pa || process.cwd(),
        host: argv.host || argv.h || "0.0.0.0",
        port: Number(argv.port || argv.po) || 4000,

        ssl: Boolean(argv.ssl || argv.s),
        sslKey: Boolean(argv.ssl || argv.s)
            ? fs.readFileSync(argv.sslKey || selfSignedKey).toString()
            : "",
        sslCert: Boolean(argv.ssl || argv.s)
            ? fs.readFileSync(argv.sslCert || selfSignedCert).toString()
            : "",
    };
    console.log(
        Object.fromEntries(
            Object.entries(config).filter(([key]) => {
                return !["sslKey", "sslCert"].includes(key);
            })
        )
    );
    const serverHandler = createApp(argv).callback();
    const httpsopt = {
        cert: config.sslCert,
        key: config.sslKey,
        allowHTTP1: true,
    };
    const server = config.ssl
        ? http2.createSecureServer(httpsopt, serverHandler)
        : http.createServer(serverHandler);
    server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.error(err);
            server.listen(Math.round(Math.random() * 65535));
            return;
        } else {
            throw err;
        }
    });

    server.on("listening", () => {
        console.log(`Server listening on ` + JSON.stringify(server.address()));
    });
    function run() {
        server.listen(config.port, config.host);
    }

    process.on("unhandledRejection", (e) => {
        console.error(e);
        throw e;
    });
    const configurl = `${config.ssl ? "https" : "http"}://${config.host}:${
        config.port
    }`;
    const logs = [
        `Server running at ${configurl}`,

        "Hit CTRL-C to stop the server",
        "Run with --help to print help",
    ];

    console.log(logs.join("\n"));
    run();
    return server;
}
