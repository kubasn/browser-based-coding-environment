import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import React from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

import { useRef } from "react";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  //first argument is function that when  called value is returned second->reference to editor itself
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
  };

  const onFormatClick = () => {
    const unformattedCode = editorRef.current.getModel().getValue();
    const formatted = prettier.format(unformattedCode, {
      parser: "babel",
      plugins: [parser],
      semi: true,
      singleQuote: true,
    });
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="group relative w-[calc(100%-10px)] h-[100%] ">
      <button
        className="bg-sky-800 text-white rounded-sm absolute right-8 top-2 z-10 p-1 opacity-0 group-hover:opacity-100 transition-all duration-[1s]  "
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        language="javascript"
        theme="dark"
        value={initialValue}
        height="100%"
        options={{
          wordWrap: "on",
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
