"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const commander_1 = require("commander");
const local_api_1 = require("@jsn-note/local-api");
const path_1 = __importDefault(require("path"));
const isProduction = process.env.NODE_ENV === "production";
//we want use proxy if we are not in production
exports.serveCommand = new commander_1.Command()
    //we are going to watch for watch command filename-optional value , 4005 -default port value []-value in there is optional <> in this is required
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    //'notebook.js' -default value
    .action((filename = "notebook.js", options) => __awaiter(void 0, void 0, void 0, function* () {
    const isServeError = (err) => {
        return typeof err.code === "string";
    };
    try {
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        //await for a call to serve
        yield (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir, !isProduction);
        console.log(`opened ${filename}. Navigate to http://localhost:${options.port} to edit this file`);
    }
    catch (err) {
        if (isServeError(err)) {
            if (err.code === "EADDRINUSE") {
                console.log("Port is already in use. Try use a another port");
            }
        }
        else {
            console.log("there is a problem", err instanceof Error && err.message);
        }
        process.exit(1);
    }
}));
