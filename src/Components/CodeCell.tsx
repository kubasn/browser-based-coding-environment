import { useState, useEffect, useRef } from "react";
import bundle from "../bundler";
import { Cell } from "../state";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
  item: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ item }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState<string>("");
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      console.log("awdawd");
      const output = await bundle(item.content);
      console.log(output);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => clearTimeout(timer);
  }, [item.content]);

  return (
    <Resizable direction="vertical">
      <div className="flex flex-row h-[calc(100%-10px)]">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1"
            onChange={(value) => updateCell(item.id, value)}
          />
        </Resizable>

        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
