import { useState, useEffect, useRef } from "react";
import bundle from "../bundler";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
const CodeCell = () => {
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
    <Resizable direction="vertical">
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
    </Resizable>
  );
};

export default CodeCell;
