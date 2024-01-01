'use client';
import { Checklist, Code, PlayCircle } from '@mui/icons-material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React from 'react';
interface lessonComponentProps {
  id: string;
  name: string;
  quantity: string;
  exerciseType: string;
  ischecked: boolean;
}
const LessonComponent: React.FC<lessonComponentProps> = ({ name, quantity, exerciseType, ischecked }) => {
  let exerciseIcon;

  // Determine the appropriate exercise icon based on exercise type
  switch (exerciseType) {
    case 'video':
      exerciseIcon = <PlayCircle></PlayCircle>;
      break;
    case 'selection_quiz':
      exerciseIcon = <Checklist></Checklist>;
      break;
    case 'code_quiz':
      exerciseIcon = <Code></Code>;
      break;
    default:
      exerciseIcon = <PlayCircle></PlayCircle>;
      break;
  }
  return (
    <div className="flex flex-row place-items-center bg-gray-100 p-2 m-1 hover:list-disc hover:bg-slate-200 rounded-lg">
      {exerciseIcon}
      <p className="px-2">{name}</p>
      <div className="ml-auto flex items-center">
        <span>{quantity}</span>
        {ischecked ? <CheckCircleOutlineIcon color="success" className="ml-2" /> : null}
      </div>
    </div>
  );
};
export default LessonComponent;
