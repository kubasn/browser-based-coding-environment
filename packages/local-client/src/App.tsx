import { useState, useEffect, useRef } from "react";
import CodeCell from "./Components/CodeCell";
import TextEditor from "./Components/TextEditor";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./Components/CellList";

const App = () => {
  return (
    <Provider store={store}>
      <div className=" h-full">
        {/* <CodeCell /> */}
        {/* <TextEditor /> */}
        <h1>Test</h1>
        <CellList />
      </div>
    </Provider>
  );
};

export default App;
