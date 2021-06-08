#!/usr/bin/env node
import fs from "fs";
import http from "http";
import http2 from "http2";
import { dirname, join } from "path";
import process from "process";
import { fileURLToPath } from "url";
import { argv } from "./argv.js";
import { app } from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const selfSignedKey = join(__dirname, "./certs/self-signed.key.pem");
const selfSignedCert = join(__dirname, "./certs/self-signed.cert.pem");
console.log("serve-cli");
if (argv.help || argv.h) {
    console.log(
        [
            "usage: serve-cli [options]",
            "",
            "options:",
            "  --path       Path to folder [process.cwd()]",
            "  --host       Host to use [0.0.0.0]",
            "  --port       Port to use [3000]",

            "  --ssl        Enable https [false]",
            "  --sslKey     Path to ssl key file [self-signed]",
            "  --sslCert    Path to ssl cert file [self-signed]",
            "  --help       Print this list and exit",

            "",
        ].join("\n")
    );
    process.exit();
}
const config = {
    path: argv.path || process.cwd(),
    host: argv.host || "0.0.0.0",
    port: Number(argv.port) || 3000,

    ssl: Boolean(argv.ssl),
    sslKey: Boolean(argv.ssl)
        ? fs.readFileSync(argv.sslKey || selfSignedKey).toString()
        : "",
    sslCert: Boolean(argv.ssl)
        ? fs.readFileSync(argv.sslCert || selfSignedCert).toString()
        : "",
};
console.log(config);
const serverHandler = app.callback();
const httpsopt = { cert: config.sslCert, key: config.sslKey };
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
