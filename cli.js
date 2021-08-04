#!/usr/bin/env node
import fs from "fs";
import http from "http";
import http2 from "http2";
import { dirname, join } from "path";
import process from "process";
import { fileURLToPath } from "url";
import { argv } from "./argv.js";
import { app } from "./index.js";
import { showhelp } from "./showhelp.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const selfSignedKey = join(__dirname, "./certs/self-signed.key.pem");
const selfSignedCert = join(__dirname, "./certs/self-signed.cert.pem");
console.log("serve-cli");
if (argv.help || argv.h) {
    showhelp();
}
const config = {
    path: argv.path || argv.p || process.cwd(),
    host: argv.host || argv.h || "0.0.0.0",
    port: Number(argv.port || argv.p) || 4000,

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
const serverHandler = app.callback();
const httpsopt = { cert: config.sslCert, key: config.sslKey, allowHTTP1: true };
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
