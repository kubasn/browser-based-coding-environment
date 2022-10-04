import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

let fileStore = localforage.createInstance({ name: "fileStore" });

// (async () => {
//   fileStore.setItem("color", "red");
// })();

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    //we handling 3 cases -> when esbuild try to find main file of module,nested module or index,js
    setup(build: esbuild.PluginBuild) {
      //when file is exactly index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });
      //if the file is ./ or ../
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: "a",
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
        };
      });

      //handle main file of the module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
