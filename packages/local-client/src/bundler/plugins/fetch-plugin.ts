import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileStore = localForage.createInstance({ name: "fileStore" });

export const fetchPlugin = (input: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      //build.onLoad({ filter: /.*/ }, async (args: any) => {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: input,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileStore.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        //dont try loading something from file system (because that would resolve in an error), we do it for you
        //check if we already store this file (is it in cache?)
        const cachedResult = await fileStore.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }
        //if so, return it immediately
        //otherwise
        const { data, request } = await axios.get(args.path);

        const escaped = data
          .replace(/\n/g, "") //new line escaped
          .replace(/"/g, '\\"') //singl quete escaped
          .replace(/'/g, "\\'"); //double quete escaped

        const contents = `
        const style = document.createElement('style');
        style.innerText= '${escaped}';
        document.head.appendChild(style);`;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        //console.log(data);
        await fileStore.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        //console.log(data);
        await fileStore.setItem(args.path, result);
        return result;
      });

      //      });
    },
  };
};
