import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { createCellsRouter } from "./routes/cells";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();
  //we try to match route if dont use proxy
  app.use(createCellsRouter(filename, dir));

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: "http://localhost:3000",
        ws: true,
        logLevel: "silent",
      })
    );
  } else {
    //reseolve original path of original.html
    const packagePath = require.resolve(
      "@jsn-note/local-client/build/index.html"
    );
    //go to local client and set up build directory
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    //we taking the entire process of starting up a express server and wrap in into promise
    app.listen(port, resolve).on("error", reject);
  });
};
