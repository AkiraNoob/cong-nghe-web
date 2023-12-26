'use client';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { ESelectionAnswerChoiceList } from '~/constant/enum/lesson.enum';
import deepClone from '~/helper/deepClone';
import { useSubmitSelectionLessonResult } from '~/hooks/userLessons.ts/useSubmitUserLessons';

export type TSelectionQuiz =
  | {
      mode: 'take';
      checkPoints?: never;
    }
  | {
      mode: 'review';
      checkPoints: {
        choosenAsnwer: ESelectionAnswerChoiceList;
        isCorrect: boolean;
        correctAnswer: ESelectionAnswerChoiceList;
      }[];
    };

export default function SelectionQuiz({
  questtionList,
  mode,
  checkPoints,
}: TSelectionQuiz & {
  questtionList: {
    question: string;
    explanation?: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
  }[];
}) {
  const totalQuestion = questtionList.length;

  const [currentQues, setCurrentQues] = useState<number>(0);
  const [selectAnswerForEachQuestion, setSelectAnswerForEachQuestion] = useState<
    Array<ESelectionAnswerChoiceList | null>
  >(new Array(totalQuestion).fill(null));
  const { mutate } = useSubmitSelectionLessonResult();

  return (
    <div className="space-y-[20px] text-black">
      <div className="flex flex-col gap-[20px] items-center">
        <div className="flex gap-[30px] items-center justify-center">
          <div className="p-1">
            <IconButton onClick={() => setCurrentQues((prev) => (prev - 1 < 0 ? 0 : prev - 1))}>
              <ChevronLeftIcon fontSize="large" />
            </IconButton>
          </div>
          <p className="text-2xl font-medium">
            Câu: <span className="underline">{currentQues + 1}</span> /<span>{totalQuestion}</span>
          </p>
          <div className="p-1">
            <IconButton onClick={() => setCurrentQues((prev) => (prev + 1 >= totalQuestion ? prev : prev + 1))}>
              <ChevronRightIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
        <Button
          onClick={() =>
            mutate(
              selectAnswerForEachQuestion.map((choosenAnswer) => ({
                choosenAnswer: null,
              })),
            )
          }
          variant="contained"
          className="!w-fit"
        >
          Nộp bài
        </Button>
      </div>

      <p>
        <strong>Câu {currentQues + 1}:</strong> {questtionList[currentQues].question}
      </p>
      <div className="flex justify-between flex-col lg:flex-row gap-[20px]">
        <div className="flex-1 text-base px-6">
          {mode === 'review' && (
            <>
              <p className="font-semibold">Giải thích: </p>
              <p className="font-normal">{questtionList[currentQues].explanation}</p>
            </>
          )}
        </div>
        <div className={`space-y-[30px] flex-1 ${mode === 'take' && 'cursor-pointer'}`}>
          {Object.values(ESelectionAnswerChoiceList).map((answer) => {
            const hashAnswerConttent: { [keys in ESelectionAnswerChoiceList]: string } = {
              [ESelectionAnswerChoiceList.A]: questtionList[currentQues].answerA,
              [ESelectionAnswerChoiceList.B]: questtionList[currentQues].answerB,
              [ESelectionAnswerChoiceList.C]: questtionList[currentQues].answerC,
              [ESelectionAnswerChoiceList.D]: questtionList[currentQues].answerD,
            };
            return (
              <SelectionQuizAnswer
                key={answer}
                setSelectAnswerForEachQuestion={() => {
                  setSelectAnswerForEachQuestion((prev) => {
                    const clone = deepClone(prev);
                    clone[currentQues] = answer;
                    return clone;
                  });
                }}
                answer={answer}
                mode={mode}
                content={hashAnswerConttent[answer]}
                isSelect={
                  answer ===
                  (mode === 'take'
                    ? selectAnswerForEachQuestion[currentQues]
                    : checkPoints?.[currentQues].choosenAsnwer)
                }
                correctAnswer={checkPoints?.[currentQues].correctAnswer}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SelectionQuizAnswer({
  setSelectAnswerForEachQuestion,
  answer,
  content,
  mode,
  isSelect,
  correctAnswer,
}: {
  setSelectAnswerForEachQuestion: () => void;
  answer: ESelectionAnswerChoiceList;
  mode: 'take' | 'review';
  content: string;
  isSelect?: boolean;
  correctAnswer?: ESelectionAnswerChoiceList;
}) {
  const hashTakeModeBackgroundColor = {
    //mode = take, isSelect true
    ['take_true']: 'bg-backgroundMain text-white',
    //mode = take, isSelect false
    ['take_false']: '',
  };

  const hashReviewModeBackgroundColor = {
    //mode = take, isSelect true, isCorrect true
    ['review_true_true']: 'bg-[#6CC001] text-white',
    //mode = take, isSelect true, isCorrect false
    ['review_true_false']: 'bg-[#960101] text-white',
    //mode = take, isSelect false, isCorrect true
    ['review_false_true']: 'bg-[#6CC001] text-white',
    //mode = take, isSelect false, isCorrect false
    ['review_false_false']: '',
  };

  const backgroundColor =
    mode === 'review'
      ? hashReviewModeBackgroundColor[
          `review_${isSelect}_${correctAnswer === answer}` as keyof typeof hashReviewModeBackgroundColor
        ]
      : hashTakeModeBackgroundColor[`take_${isSelect}` as keyof typeof hashTakeModeBackgroundColor];

  return (
    <div
      onClick={mode === 'take' ? setSelectAnswerForEachQuestion : undefined}
      key={answer}
      className="flex gap-[20px] items-center w-fit group ease-in-out transition-all"
    >
      <p>{answer.toUpperCase()}.</p>
      <div
        className={`${backgroundColor}} text-textMain group-hover:border-backgroundMain border border-solid border-[#79747E] p-[10px_24px] ease-in-out transition-all rounded-lg`}
      >
        <span>{content}</span>
      </div>
    </div>
  );
}
