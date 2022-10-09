#!/usr/bin/env node

import { program } from "commander";

import { serveCommand } from "./commands/serve";

//associate a bunch of commands together

program.addCommand(serveCommand);

//make commander to look at the command line arguments and try to execute appropriate command
program.parse(process.argv);
