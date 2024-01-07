/* eslint-disable @next/next/no-img-element */
'use client';

import AddIcon from '@mui/icons-material/Add';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, IconButton, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import routePath from '~/constant/routePath';
import { generatePathname } from '~/helper/generatePathname';
import useCreateCourse from '~/hooks/course/useCreateCourse';
import { useUploadImage } from '~/hooks/useUploadFile';
import LoadingButtonProvider from '../loading_button';

const AddCourseButton = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((p) => !p);
  };

  return (
    <>
      <Button onClick={toggle} variant="contained" startIcon={<AddIcon />}>
        Thêm khóa học
      </Button>

      <CustomDialog open={open} toggle={toggle} />
    </>
  );
};

export default AddCourseButton;

function CustomDialog({ open, toggle }: { open: boolean; toggle: () => void }) {
  const router = useRouter();
  const { mutate, isPending } = useCreateCourse({
    onSuccess(data) {
      router.push(
        generatePathname({
          pathName: routePath.COURSE_MANAGE_DETAIL,
          query: {
            courseId: data,
          },
        }),
      );
    },
  });
  const { mutateAsync: uploadImage, isPending: isPendingUpload } = useUploadImage();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const imgUrl = useRef<string>();

  const [nameCourse, setNameCourse] = useState('');

  const [description, setDescription] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const file = files[0];
      setSelectedImage(file);
      imgUrl.current = URL.createObjectURL(file);
    }
  };

  const handleSaveInformation = async () => {
    const imgSrc = await uploadImage(selectedImage as Blob);

    mutate({
      title: nameCourse,
      description,
      cover: imgSrc,
      label: [],
      lessonIds: [],
    });
  };

  return (
    <Dialog open={open} onClose={toggle} fullWidth maxWidth="md">
      <div className="flex items-center justify-between p-4">
        <Typography
          sx={{ ml: 2, flex: 1, justifyItems: 'center' }}
          variant="h6"
          component="div"
          className="hidden sm:block"
        >
          Tạo mô tả khoá học
        </Typography>
        <IconButton edge="start" color="inherit" onClick={toggle} aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>
      <div className="flex-col flex space-y-4 p-7">
        <TextField
          label="Tiêu đề khóa học"
          name="title"
          value={nameCourse}
          onChange={(e) => setNameCourse(e.target.value)}
          required
        />
        <TextField
          label="Mô tả khóa học"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          required
        />
        <div className="relative rounded-2xl w-fit mx-auto">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <img src={imgUrl.current || '/images/default_cover.png'} alt="Uploaded" className="h-[240px] aspect-[1.67]" />
          <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <IconButton className="!text-white" onClick={() => fileInputRef.current?.click()}>
              <AddAPhotoIcon color="inherit" />
            </IconButton>
          </div>
        </div>
        <div className="flex justify-end">
          <LoadingButtonProvider isLoading={isPending || isPendingUpload}>
            <Button variant="contained" autoFocus onClick={handleSaveInformation} className="">
              Lưu
            </Button>
          </LoadingButtonProvider>
        </div>
      </div>
    </Dialog>
  );
}
