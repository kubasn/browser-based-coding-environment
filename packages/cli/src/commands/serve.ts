import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

interface ServeError {
  code: string;
}
const isProduction = process.env.NODE_ENV === "production";
//we want use proxy if we are not in production
export const serveCommand = new Command()
  //we are going to watch for watch command filename-optional value , 4005 -default port value []-value in there is optional <> in this is required
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number", "port to run server on", "4005")
  //'notebook.js' -default value
  .action(async (filename = "notebook.js", options: { port: string }) => {
    const isServeError = (err: any): err is ServeError => {
      return typeof err.code === "string";
    };

    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      //await for a call to serve
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `opened ${filename}. Navigate to http://localhost:${options.port} to edit this file`
      );
    } catch (err) {
      if (isServeError(err)) {
        if (err.code === "EADDRINUSE") {
          console.log("Port is already in use. Try use a another port");
        }
      } else {
        console.log("there is a problem", err instanceof Error && err.message);
      }
      process.exit(1);
    }
  });
