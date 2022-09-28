import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";

const TextEditor: React.FC = () => {
  const [editingStatus, setEditingStatus] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      //we make sure ref.current is defined (we are pointing at div), event.target is defined - we clicked at element that exist, and finally we check if event.target is inside ref.current
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        console.log("inside");
      } else {
        console.log("outside");
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
      <div ref={ref}>
        <MDEditor />
      </div>
    );
  }

  return (
    <div onClick={() => setEditingStatus(true)}>
      <MDEditor.Markdown className="text-white" source="# Header" />
    </div>
  );
};

export default TextEditor;
