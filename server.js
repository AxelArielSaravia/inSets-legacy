import * as path from "path";
import {statSync} from "fs";

const DIR = path.resolve(import.meta.dir, "dev-server");
const MEDIA = path.resolve(import.meta.dir, "media");
const PORT = 3333;

const response_OPTIONS = {status: 404};
const statSync_OPTIONS = {bigint: false, throwIfNoEntry: false};


const badResponse = new Response("File not found", response_OPTIONS);
const URLObj = new URL("a:");

const server = Bun.serve({
    port: PORT,
    fetch(request) {
        console.info("New request URL:", request.url);

        URLObj.href = request.url;
        let reqPath = URLObj.pathname;
        let isMedia = false;
        console.info(request.method, reqPath);

        if (reqPath === "/") {
            reqPath = "/index.html";
        } else if (reqPath.startsWith("/media")) {
            isMedia = true;
            reqPath = reqPath.replace("/media", "");
        }

        let extension = path.extname(reqPath);
        if (extension.length === 0) {
            console.warn("The request path is bad:", reqPath);
            return badResponse;
        }
        /**
        @type {Stats | BigIntStats | undefined} */
        let stat;
        let basePath = "";
        if (isMedia) {
            basePath = path.join(MEDIA, reqPath);
        } else {
            basePath = path.join(DIR, reqPath);
        }

        try {
            stat = statSync(basePath, statSync_OPTIONS);
        } catch {
            console.error("Error in statSync");
            return badResponse;
        };

        if (stat !== undefined && stat.isFile()) {
            console.info("Request path exist. Sending:", reqPath);
            return new Response(Bun.file(basePath));
        } else {
            console.warn(`WARNING: No such file or directory: ${basePath}`);
        }
        return badResponse;
    }
});

console.log(`Server listening on http://localhost:${server.port}`);
