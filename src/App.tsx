import { useState, useEffect, useRef } from "react";
import CodeCell from "./Components/CodeCell";
import TextEditor from "./Components/TextEditor";
import { Provider } from "react-redux";
import { store } from "./state";

const App = () => {
  return (
    <Provider store={store}>
      <div className="bg-stone-700 h-full pt-2">
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
};

export default App;
