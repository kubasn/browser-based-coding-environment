"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const path_1 = __importDefault(require("path"));
const cells_1 = require("./routes/cells");
const serve = (port, filename, dir, useProxy) => {
    const app = (0, express_1.default)();
    //we try to match route if dont use proxy
    app.use((0, cells_1.createCellsRouter)(filename, dir));
    if (useProxy) {
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: "http://localhost:3000",
            ws: true,
            logLevel: "silent",
        }));
    }
    else {
        //reseolve original path of original.html
        const packagePath = require.resolve("@jsn-note/local-client/build/index.html");
        //go to local client and set up build directory
        app.use(express_1.default.static(path_1.default.dirname(packagePath)));
    }
    return new Promise((resolve, reject) => {
        //we taking the entire process of starting up a express server and wrap in into promise
        app.listen(port, resolve).on("error", reject);
    });
};
exports.serve = serve;
