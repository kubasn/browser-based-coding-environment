import { useEffect, useRef } from "react";
import { Cell } from "../state";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { useActions } from "../hooks/use-actions";
//pull state out of store
import { useTypedSelector } from "../hooks/use-typed-selector";
import "./codeCell.css";
import { useAllCode } from "../hooks/use-all-codes";

interface CodeCellProps {
  item: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ item }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(({ bundles }) => bundles[item.id]);
  const cumulativeCode = useAllCode(item.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(item.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(item.id, cumulativeCode);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cumulativeCode, item.id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div className="flex flex-row h-[calc(100%-10px)]">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={item.content}
            onChange={(value) => updateCell(item.id, value)}
          />
        </Resizable>
        {!bundle || bundle.loading ? (
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <Preview code={bundle.code} bundlingStatus={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
