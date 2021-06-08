#!/usr/bin/env node
const server = http.createServer(app.callback());

server.listen(3000).on("listening", () => {
    console.log(server.address());
});
import http from "http";
import { app } from "./index.js";

