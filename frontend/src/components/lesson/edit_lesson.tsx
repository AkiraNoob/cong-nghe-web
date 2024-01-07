'use client';

import { Divider } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { memo, useState } from 'react';
import EditLessonResource from '~/components/lesson/edit_lesson_resource';
import { ELessonType } from '~/constant/enum/lesson.enum';
import useCreateLesson from '~/hooks/lesson/useCreateLesson';
import useUpdateLesson from '~/hooks/lesson/useUpdateLesson';
import { TLessonResource } from '~/types/api/lesson.types';
import LoadingButtonProvider from '../loading_button';

const EditLesson = ({ lessonId }: { lessonId?: string }) => {
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');

  const [typeLesson, setTypeLesson] = useState<ELessonType>(ELessonType.Video);
  const handleChange = (event: SelectChangeEvent<ELessonType>) => {
    setTypeLesson(event.target.value as ELessonType);
  };

  const { mutate: mutateCreateLesson, isPending: isPendingCreate } = useCreateLesson();
  const { mutate: mutateUpdateLesson, isPending: isPendingUpdate } = useUpdateLesson(lessonId as string);

  return (
    <LoadingButtonProvider isLoading={isPendingUpdate || isPendingCreate}>
      <div className="flex-col flex space-y-4 p-7 w-full">
        <TextField
          label="Tiêu đề bài học"
          name="title"
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
          multiline
          required
        />
        <TextField
          label="Mô tả bài học"
          name="description"
          value={lessonDescription}
          onChange={(e) => setLessonDescription(e.target.value)}
          multiline
          required
        />
        <div className="md:w-1/3 w-2/3">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" required>
              Loại bài giảng
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typeLesson}
              label="Loại bài giảng"
              onChange={handleChange}
              required
            >
              <MenuItem value={ELessonType.Video}>Video</MenuItem>
              <MenuItem value={ELessonType.Selection}>Selection</MenuItem>
              <MenuItem value={ELessonType.CodeScript}>Code script</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Divider light />
        <EditLessonResource
          type={typeLesson}
          handleSubmit={async (resource: TLessonResource) => {
            const payload = { resource, title: lessonTitle, type: typeLesson, description: lessonDescription };
            !lessonId ? mutateCreateLesson(payload) : mutateUpdateLesson(payload);
          }}
        />
      </div>
    </LoadingButtonProvider>
  );
};

export default memo(EditLesson);
