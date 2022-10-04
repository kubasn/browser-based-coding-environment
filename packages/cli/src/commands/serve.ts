import { Command } from "commander";
import { serve } from "local-api";

export const serveCommand = new Command()
  //we are going to watch for watch command filename-optional value , 4005 -default port value []-value in there is optional <> in this is required
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number", "port to run server on", "4005")
  //'notebook.js' -default value
  .action((filename = "notebook.js", options: { port: string }) => {
    serve(parseInt(options.port), filename, "/");
  });
