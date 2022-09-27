import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState("");

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };
  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    console.log(ref.current.transform);

    //reload iframe to prevent errors
    iframe.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        //! we define here string not variable. we want to override NODE_ENV
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    // console.log(result);
    // setCode(result.outputFiles[0].text);
    // try {
    //   eval(result.outputFiles[0].text);
    // } catch (err) {
    //   alert(err);
    // }
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };

  const html = `
  <html>
  <head></head>
  <body>
  <div id='root'></div>
  <script>
  window.addEventListener('message',(event)=>{
    try{
    eval(event.data);
    } catch(err) {
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color:white; background-color:#f59c95">' + '<h4>Runtime error</h4>' + err + '</div>'
    }
  },false)
  
  </script>
  </body>
  </html>

  
  `;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default App;
