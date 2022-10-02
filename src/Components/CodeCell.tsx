import { useEffect, useRef } from "react";
import { Cell } from "../state";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { useActions } from "../hooks/use-actions";
//pull state out of store
import { useTypedSelector } from "../hooks/use-typed-selector";

interface CodeCellProps {
  item: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ item }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(({ bundles }) => bundles[item.id]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(item.id, item.content);
    }, 1000);

    return () => clearTimeout(timer);
  }, [item.content, item.id]);

  return (
    <Resizable direction="vertical">
      <div className="flex flex-row h-[calc(100%-10px)]">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={item.content}
            onChange={(value) => updateCell(item.id, value)}
          />
        </Resizable>

        {bundle && <Preview code={bundle.code} bundlingStatus={bundle.err} />}
      </div>
    </Resizable>
  );
};

export default CodeCell;
