import { useState, useEffect, useRef } from "react";
import CodeCell from "./Components/CodeCell";
import TextEditor from "./Components/TextEditor";

const App = () => {
  return (
    <div className="bg-stone-700 h-full pt-2">
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  );
};

export default App;
