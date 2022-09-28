import { useState, useEffect, useRef } from "react";
import CodeCell from "./Components/CodeCell";
import TextEditor from "./Components/textEditor";

const App = () => {
  return (
    <div className="bg-stone-900 h-full m-0 p-0">
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  );
};

export default App;
