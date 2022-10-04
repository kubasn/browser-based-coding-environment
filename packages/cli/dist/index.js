"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const serve_1 = require("./commands/serve");
//associate a bunch of commands together
commander_1.program.addCommand(serve_1.serveCommand);
//make commander to look at the command line arguments and try to execute appropriate command
commander_1.program.parse(process.argv);
