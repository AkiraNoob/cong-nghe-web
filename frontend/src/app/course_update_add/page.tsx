'use client';
import AddIcon from '@mui/icons-material/Add';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { AppBar, Button, ButtonProps, CardMedia, Dialog, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Toolbar, Typography } from '@mui/material';
import Slide from '@mui/material/Slide';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import React, { ChangeEvent, useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import HeaderComponent from '~/components/header_component';
import LessonOwner from '~/components/lesson/lesson_owner';
import SelectionQuestion from '~/components/lesson/selection_question';
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(grey[900]),
  backgroundColor: grey[900],
  '&:hover': {
    backgroundColor: grey[800],
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ListItem {
  id: string;
  name: string;
  quantity: string;
  exerciseType: string;
  ischecked: boolean;
}

const CourseUpdateAdd: React.FC = () => {

  const [selectedImage, setSelectedImage] = React.useState('/images/cplusplus.jpg');

  const [open, setOpen] = React.useState(false);

  const [nameCourse, setNameCourse] = React.useState('Lập Trình JavaScript Cơ Bản');

  const [description, setDescription] = React.useState('JavaScript is a programming language that adds interactivity to your website for example games, responses when buttons are pressed or data is entered in forms, dynamic styling, andanimation. This article helps you get started with this exciting language and gives you an idea of what is possible');

  const [typeLesson, settypeLesson] = React.useState('');

  const [numQuestion, setnumQuestion] = React.useState(0);


  const handleNumQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numericValue = parseInt(value, 10); // Chuyển đổi giá trị thành số

    if (!isNaN(numericValue)) {
      setnumQuestion(numericValue);
    }else {
      setnumQuestion(0); // Xóa giá trị bằng cách gán rỗng
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    settypeLesson(event.target.value as string);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    ///Toi de tam thui nha
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    
  };
  

  const handleButtonClick = (data: string) =>{
    
  };
  const data2 = [
    {
      id: '1',
      name: 'Bài 1: Lập trình C',
      quantity: '12:40',
      exerciseType: 'video',
      ischecked: true,
    },
    {
      id: '2',
      name: 'Bài tập: Lập trình C',
      quantity: '12 test',
      exerciseType: 'selection_quiz',
      ischecked: true,
    },
    {
      id: '3',
      name: 'Bài tập: Lập trình C',
      quantity: '12 test',
      exerciseType: 'code_quiz',
      ischecked: true,
    },
    {
      id: '4',
      name: 'Bài 2: Lập trình C',
      quantity: '12:40',
      exerciseType: 'video',
      ischecked: false,
    },
    {
      id: '5',
      name: 'Bài tập: Lập trình C',
      quantity: '12 test',
      exerciseType: 'selection_quiz',
      ischecked: false,
    },
  ];


  // const [items, setItems] = useState<ListItem[]>(data2);

  // const handleDragEnd = (result: DropResult) => {
  //   if (!result.destination) {
  //     return;
  //   }
    
  //   const updatedItems = Array.from(items);
  //   const [removed] = updatedItems.splice(result.source.index, 1);
  //   updatedItems.splice(result.destination.index, 0, removed);

  //   setItems(updatedItems);
  // };


  return (
    <div>
      <HeaderComponent></HeaderComponent>
       <div className='pr-10 pl-10 pb-10 pt-5'>
          <div className='flex justify-end'>
            <Button color="secondary" variant="outlined" sx={{ textTransform: 'none', marginBottom: 2, borderRadius: 5}}>
                Xuất bản khóa học
            </Button>
          </div>
          <div className='items-center block md:hidden'>
            <CardMedia sx={{ height: 200, width: '100%',  borderRadius: 1, display: "flex" }} image={'/images/cplusplus.jpg'} title="green iguana"></CardMedia>
          </div>
          <div className='flex justify-between'>
            <div className='md:mr-10 md:mt-0 mt-3'>
              <h2 className=" text-2xl md:text-3xl font-bold mb-3">{nameCourse}</h2>
              <div className='mb-3'>
                  <span className='text-gray-600'>
                  {description}
                  </span>
              </div>
              <ColorButton variant="contained" startIcon = {<EditIcon/>} onClick={handleClickOpen}>
                  Chỉnh sửa tiêu đề khóa học
              </ColorButton>`
            </div>
            <div className='items-center hidden sm:block'>
              <CardMedia sx={{ height: 150, width: 220, borderRadius: 1, display: "flex" }} image={selectedImage} title="green iguana"></CardMedia>
            </div>
          </div>
          <div className='flex justify-between mt-10'>
            <h2 className=" text-1xl md:text-2xl font-bold mb-3">Nội dung khóa học</h2>
            <ColorButton variant="contained" startIcon = {<AddIcon/>} onClick={()=>{}}>
               Thêm bài giảng
            </ColorButton>
          </div>
          <div className='flex mt-3'>
            <DragDropContext onDragEnd={()=>{}}>
              <Droppable droppableId="list" >
                {(provided) => (
                  <div className="border-dashed border border-gray-100 w-1/4"
                  ref={provided.innerRef} {...provided.droppableProps}>
                    {data2.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div className='m-1 p-1 select-none'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <LessonOwner
                              id={item.id}
                              name={item.name}
                              quantity={item.quantity}
                              exerciseType={item.exerciseType}
                              isChoose={item.ischecked}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className='border-2 border-gray-300 w-3/4 rounded-2xl'>
              <div className='flex-col flex space-y-4 p-7'>
                <TextField
                label="Tiêu đề bài học"
                name="title"
                value={nameCourse}
                onChange={(e) => setNameCourse(e.target.value)}
                multiline
                required
                />
                <TextField
                  label="Mô tả bài học"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  required
                />
                <div className='w-1/3'>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" required>Loại bài giảng</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={typeLesson}
                      label="Loại bài giảng"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value={'video'}>Video</MenuItem>
                      <MenuItem value={'selection'}>Selection</MenuItem>
                      <MenuItem value={'code script'}>Code script</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Divider light />
                {typeLesson === 'selection' && (
                  <div>
                    A B C D ne
                  </div>
                )}

                {typeLesson === 'video' && (
                  <div className='space-y-4'>
                    <TextField
                      label="Số lượng câu hỏi"
                      name="description"
                      type='number'
                      value={numQuestion}
                      onChange={handleNumQuestionChange}
                      multiline
                      required
                    />
                    <SelectionQuestion id='1' nameLesson='' descriptionLesson='' textResultA='' textResultB='' textResultC='' textResultD=''></SelectionQuestion>
                  </div>
                )}

                {typeLesson === 'code script' && (
                  <div>
                    test case
                  </div>
                )}
                
              </div>
            </div>
          </div>
          
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          >
          <AppBar sx={{ position: 'relative' }} color="primary">
            <Toolbar color="primary">
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1,  justifyItems: 'center'}} variant="h6" component="div" className='hidden sm:block'>
                Tiêu đề khóa học 
              </Typography>
              <Typography sx={{ ml: 2, flex: 1,  justifyItems: 'center', marginLeft: 5, marginRight: 5 }} variant="h6" component="div" className='block md:hidden'>
                Tiêu đề khóa học
              </Typography>
            </Toolbar>
          </AppBar>
          <div className='flex-col flex space-y-4 p-7'>
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
            <div className="relative rounded-2xl">
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} ref={fileInputRef} />
              {selectedImage && <img src={selectedImage} alt="Uploaded" />}
            <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <button className="bg-white text-black px-4 py-2 rounded-2xl transition-colors" onClick={handleFileUpload}>
                <AddAPhotoIcon></AddAPhotoIcon>
              </button>
            </div>
            </div>
            <div className='flex justify-end'>
              <ColorButton autoFocus color="inherit" onClick={handleClose} className=''>
                Lưu
              </ColorButton>
            </div>
          </div>
          
        </Dialog>
    </div>
  )
}
export default CourseUpdateAdd;
