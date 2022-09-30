import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import { Cell } from "../state";
import "./textEditor.css";
import { useActions } from "../hooks/use-actions";

interface TextEditorProps {
  item: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ item }) => {
  const [editingStatus, setEditingStatus] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      //we make sure ref.current is defined (we are pointing at div), event.target is defined - we clicked at element that exist, and finally we check if event.target is inside ref.current
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditingStatus(false);
      console.log(event.target);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editingStatus) {
    return (
      <div className="text-editor bg-stone-600" ref={ref}>
        <MDEditor
          value={item.content}
          onChange={(text) => updateCell(item.id, text || "")}
        />
      </div>
    );
  }

  return (
    <div
      className="text-editor bg-stone-600  p-8"
      onClick={() => setEditingStatus(true)}
    >
      <MDEditor.Markdown
        className="text-white"
        source={item.content || "Click to add note!"}
      />
    </div>
  );
};

export default TextEditor;
