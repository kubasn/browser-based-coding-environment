import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import bundle from "./bundler";
import CodeEditor from "./Components/CodeEditor";
import Preview from "./Components/Preview";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
    // try {
    //   eval(result.outputFiles[0].text);
    // } catch (err) {
    //   alert(err);
    // }
  };

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button
          className="bg-slate-500 text-white p-2 rounded-sm my-2"
          onClick={onClick}
        >
          Submit
        </button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default App;
