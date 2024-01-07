'use client';

import { Editor } from '@monaco-editor/react';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import Button from '@mui/material/Button';
import { useRef } from 'react';

const CodeScriptLesson = () => {
  const editorRef = useRef<any>(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current?.getValue());
  }
  return (
    <div className="p-3 flex flex-col items-end bg-[#C9C9C9] relative">
      <Editor
        height="60vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
      />

      <Button
        startIcon={<SlowMotionVideoIcon />}
        variant="outlined"
        className="monaco-editor !mt-3 relative !bg-[var(--vscode-editorGutter-background)]"
      >
        Thực thi
      </Button>
    </div>
  );
};

export default CodeScriptLesson;
