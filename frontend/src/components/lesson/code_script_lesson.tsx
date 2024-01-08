'use client';

import { Editor } from '@monaco-editor/react';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Slide, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { TCodescriptLessonResourse } from '~/types/api/lesson.types';

const CodeScriptLesson = ({ resource }: { resource: TCodescriptLessonResourse[] }) => {
  const editorRef = useRef<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current?.getValue());
  }

  const [openTestcase, setOpenTestcase] = useState(false);

  return (
    <div ref={containerRef} className="p-3 flex flex-col items-end bg-[#C9C9C9] relative">
      <Editor
        height="60vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
      />
      <div className="flex gap-4">
        <Button
          startIcon={<QuizOutlinedIcon />}
          variant="outlined"
          onClick={() => setOpenTestcase(true)}
          className="monaco-editor !mt-3 relative !bg-[var(--vscode-editorGutter-background)]"
        >
          Testcase
        </Button>

        <Button
          startIcon={<SlowMotionVideoIcon />}
          variant="outlined"
          className="monaco-editor !mt-3 relative !bg-[var(--vscode-editorGutter-background)]"
        >
          Thực thi
        </Button>
      </div>

      <Slide direction="up" in={openTestcase} container={containerRef.current}>
        <div className="absolute bottom-0 left-0 right-0 bg-textMain rounded-t-lg text-[#C9C9C9] max-h-[50%] overflow-y-auto">
          <div className="ml-auto w-fit">
            <IconButton onClick={() => setOpenTestcase(false)}>
              <CloseIcon className="text-[#C9C9C9]" />
            </IconButton>
          </div>
          {resource.map((item, index) => (
            <Accordion
              sx={{
                margin: `0px !important`,
              }}
              key={index}
            >
              <div className="flex items-center bg-[#2C1835]">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className="text-[#C9C9C9]" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="flex-auto"
                >
                  <Typography className="text-[#C9C9C9]">Testcase {index + 1}</Typography>
                </AccordionSummary>
              </div>
              <AccordionDetails className="bg-textMain">
                <div>
                  <p className="text-[#C9C9C9]">
                    Input: <span>{item.input}</span>
                  </p>
                  <p className="text-[#C9C9C9]">
                    Output: <span>{item.input}</span>
                  </p>
                  <p className="text-[#C9C9C9]">
                    Expected: <span>{item.expected}</span>
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Slide>
    </div>
  );
};

export default CodeScriptLesson;
