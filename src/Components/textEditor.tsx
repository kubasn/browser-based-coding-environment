import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import "./textEditor.css";

const TextEditor: React.FC = () => {
  const [editingStatus, setEditingStatus] = useState(false);
  const [value, setValue] = useState<string>("# Header");
  const ref = useRef<HTMLDivElement | null>(null);

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
        <MDEditor value={value} onChange={(text) => setValue(text || "")} />
      </div>
    );
  }

  return (
    <div
      className="text-editor bg-stone-600 m-2 p-8"
      onClick={() => setEditingStatus(true)}
    >
      <MDEditor.Markdown className="text-white" source={value} />
    </div>
  );
};

export default TextEditor;
