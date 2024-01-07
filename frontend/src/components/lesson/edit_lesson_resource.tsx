'use client';

import AddIcon from '@mui/icons-material/Add';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import Button from '@mui/material/Button';
import { memo, useState } from 'react';
import { defaultSelectionQuestionResource } from '~/constant/data/lesson';
import { ELessonType } from '~/constant/enum/lesson.enum';
import deepClone from '~/helper/deepClone';
import { TLessonResource, TSelectionLessonResourse } from '~/types/api/lesson.types';
import SelectionQuestion from './selection_question_edit';

interface IEditLessonResource {
  type: ELessonType;
  handleSubmit: (_resource: TLessonResource) => Promise<any>;
}

function EditLessonResource({ type, handleSubmit }: IEditLessonResource) {
  switch (type) {
    case ELessonType.Video:
      return <EditVideoLesson handleSubmit={handleSubmit} />;
    case ELessonType.CodeScript:
      return <EditCodeScriptLesson handleSubmit={handleSubmit} />;
    case ELessonType.Selection:
      return <EditSelectionLesson handleSubmit={handleSubmit} />;
    default:
      return <></>;
  }
}

export default memo(EditLessonResource);

function EditVideoLesson({ handleSubmit }: Pick<IEditLessonResource, 'handleSubmit'>) {
  return (
    <div className="space-y-5 text-sm text-gray-500">
      <Button
        variant="outlined"
        startIcon={<FileUploadOutlinedIcon />}
        size="small"
        sx={{ textTransform: 'none' }}
        onClick={() => {}}
      >
        Tải lên video bài giảng
      </Button>
      <div>
        <span>Tên video sau khi upload</span>
      </div>
      <Button variant="contained" size="small" onClick={() => {}}>
        Lưu
      </Button>
    </div>
  );
}

function EditCodeScriptLesson({ handleSubmit }: Pick<IEditLessonResource, 'handleSubmit'>) {
  return (
    <div className="flex-col flex space-y-3 text-sm text-gray-500">
      <span>Upload file json để tạo danh sách testcase cho bài giảng code script.</span>
      <span>File json phải có nội dung như file mẫu dưới đây.</span>
      <div className="flex-col space-y-3">
        <Button startIcon={<SaveAltOutlinedIcon />} size="small" sx={{ textTransform: 'none' }} onClick={() => {}}>
          Tải xuống mẫu test case
        </Button>
        <br></br>
        <Button
          variant="outlined"
          startIcon={<FileUploadOutlinedIcon />}
          size="small"
          sx={{ textTransform: 'none' }}
          onClick={() => {}}
        >
          Tải lên mẫu test case
        </Button>
      </div>
      <span>Tên file sau khi upload</span>
      <div>
        <Button variant="contained" size="small" onClick={() => {}}>
          Lưu
        </Button>
      </div>
    </div>
  );
}

function EditSelectionLesson({ handleSubmit }: Pick<IEditLessonResource, 'handleSubmit'>) {
  const [resource, setResource] = useState<TSelectionLessonResourse[]>([]);

  return (
    <div>
      <div className="mb-5">
        <Button variant="contained" size="small" onClick={() => {}}>
          Lưu
        </Button>
      </div>
      <div className="space-y-4">
        {resource.map((item, index) => (
          <SelectionQuestion
            id={index + 1}
            key={item.question}
            clickDelete={() => setResource((prev) => deepClone(prev).splice(index, 1))}
            handleUpdateResouce={(data) =>
              setResource((prev) => {
                const clone = deepClone(prev);
                clone.splice(index, 1, data);
                return clone;
              })
            }
            {...item}
          />
        ))}

        <div className="justify-center w-full flex">
          <Button
            onClick={() =>
              setResource((prev) => {
                const clone = deepClone(prev);
                clone.push(defaultSelectionQuestionResource);
                return clone;
              })
            }
            color="inherit"
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none' }}
          >
            Thêm câu hỏi
          </Button>
        </div>
      </div>
    </div>
  );
}
