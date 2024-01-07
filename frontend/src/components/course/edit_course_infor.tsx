/* eslint-disable @next/next/no-img-element */
'use client';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Skeleton } from '@mui/material';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';
import { useParams } from 'next/navigation';
import { forwardRef, useRef, useState } from 'react';
import useChangeCourseStatus from '~/hooks/course/useChangeCourseStatus';
import useCourseDetail from '~/hooks/course/useCourseDetail';
import useUpdateCourse from '~/hooks/course/useUpdateCourse';
import { useUploadImage } from '~/hooks/useUploadFile';
import LoadingButtonProvider from '../loading_button';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditCourseInformation = ({ courseId }: { courseId: string }) => {
  const { data, isSuccess, refetch } = useCourseDetail(courseId);

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((p) => !p);

  return (
    <>
      <ChangeCourseStatus />

      {isSuccess && data ? (
        <>
          <div className="flex justify-between flex-col-reverse md:flex-row">
            <div className="md:mr-10 md:mt-0 mt-3">
              <h2 className=" text-2xl md:text-3xl font-bold mb-3">{data.title}</h2>
              <div className="mb-3">
                <span className="text-gray-600">{data.description}</span>
              </div>
              <Button variant="contained" startIcon={<EditIcon />} sx={{ textTransform: 'none' }} onClick={toggle}>
                Chỉnh sửa mô tả khóa học
              </Button>
            </div>
            <div className="items-center">
              <CardMedia
                sx={{ height: 220, borderRadius: 1, display: 'flex', aspectRatio: 1.67 }}
                image={data.cover}
                title="green iguana"
              />
            </div>
          </div>
          <CustomDialog open={open} toggle={toggle} refetch={refetch} />
        </>
      ) : (
        <>
          <div className="flex justify-between flex-col-reverse md:flex-row">
            <div className="md:mr-10 md:mt-0 mt-3 flex-1">
              <Skeleton variant="rounded" width={'60%'} height={26} className="mb-3" />
              <Skeleton variant="rounded" width={'100%'} height={160} />
            </div>

            <Skeleton variant="rounded" width={220 * 1.67} height={220} />
          </div>
        </>
      )}
    </>
  );
};

export default EditCourseInformation;

function ChangeCourseStatus() {
  useChangeCourseStatus();

  return (
    <div className="flex justify-end">
      <Button color="secondary" variant="outlined" sx={{ textTransform: 'none', marginBottom: 2, borderRadius: 5 }}>
        Xuất bản khóa học
      </Button>
    </div>
  );
}

function CustomDialog({ open, toggle, refetch }: { open: boolean; toggle: () => void; refetch: () => void }) {
  const { courseId } = useParams();

  const { mutate, isPending } = useUpdateCourse(courseId as string, {
    onSuccess(data) {
      refetch();
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
    <>
      <Dialog open={open} onClose={toggle} fullWidth maxWidth="md" TransitionComponent={Transition}>
        <div className="flex items-center justify-between p-4">
          <Typography
            sx={{ ml: 2, flex: 1, justifyItems: 'center' }}
            variant="h6"
            component="div"
            className="hidden sm:block"
          >
            Chỉnh sửa mô tả khoá học
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
            multiline
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
            <img
              src={imgUrl.current || '/images/default_cover.png'}
              alt="Uploaded"
              className="h-[240px] aspect-[1.67]"
            />
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
    </>
  );
}