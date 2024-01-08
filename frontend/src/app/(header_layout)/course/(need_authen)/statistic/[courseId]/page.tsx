'use client';
import EditIcon from '@mui/icons-material/Edit';
import LaunchIcon from '@mui/icons-material/Launch';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import SttLesson from '~/components/statistics/stt_lesson';
import SttStudent from '~/components/statistics/stt_student';
import routePath from '~/constant/routePath';
import { generatePathname } from '~/helper/generatePathname';

function CourseStatisticData_Lesson(
  id: string,
  name: string,
  timelesson: number,
  timecreate: string,
  typelesson: string,
  done: number,
) {
  return { id, name, timelesson, timecreate, typelesson, done };
}

const rows_lesson = [
  CourseStatisticData_Lesson('1', 'Giới thiệu ngôn ngữ lập trình C/C++', 15, '12/03/2023', 'Code Scpipt', 1203),
  CourseStatisticData_Lesson('2', 'Làm quan với con trỏ', 12, '12/03/2023', 'Code Scpipt', 1203),
  CourseStatisticData_Lesson('3', 'Các kiểu dữ liệu trong C/C++', 13, '12/03/2023', 'Code Scpipt', 1203),
  CourseStatisticData_Lesson('4', 'Mảng một chiều trong C/C++', 30, '12/03/2023', 'Code Scpipt', 1203),
  CourseStatisticData_Lesson('5', 'Mảng hai chiều trong C/C++', 35, '12/03/2023', 'Code Scpipt', 1203),
];

function CourseStatisticData_Student(id: string, name: string, avatar: string, timejoin: string) {
  return { id, name, avatar, timejoin };
}

const rows_student = [
  CourseStatisticData_Student('1', 'Nguyễn Trung Tính', '/images/avatar.jpeg', '30/12/2023'),
  CourseStatisticData_Student('2', 'Nguyễn Trung Tính', '/images/avatar.jpeg', '30/12/2023'),
  CourseStatisticData_Student('3', 'Nguyễn Trung Tính', '/images/avatar.jpeg', '30/12/2023'),
  CourseStatisticData_Student('4', 'Nguyễn Trung Tính', '/images/avatar.jpeg', '30/12/2023'),
  CourseStatisticData_Student('5', 'Nguyễn Trung Tính', '/images/avatar.jpeg', '30/12/2023'),
];

const CourseStatisticsDetail: React.FC = () => {
  const [value, setValue] = React.useState('1');
  const router = useRouter();
  const { courseId } = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleButtonClick = (data: string) => {};
  return (
    <>
      <div className="pr-10 pl-10 pb-10 pt-5">
        <div>
          <h2 className=" text-2xl md:text-3xl font-bold mb-3">Thống kê chi tiết khóa học</h2>
          <h2 className=" text-1xl md:text-2xl font-bold mb-3">Lập Trình JavaScript Cơ Bản</h2>
          <div className="md:w-1/2 mb-3">
            <span className="text-gray-600">
              JavaScript is a programming language that adds interactivity to your website (for example games, responses
              when buttons are pressed or data is entered in forms, dynamic styling, andanimation). This article helps
              you get started with this exciting language and gives you an idea of what is possible.
            </span>
          </div>
          <Button
            onClick={() =>
              router.push(
                generatePathname({
                  pathName: routePath.COURSE_MANAGE_DETAIL,
                  query: {
                    courseId: courseId as string,
                  },
                }),
              )
            }
            variant="contained"
            startIcon={<EditIcon />}
          >
            Chỉnh sửa khóa học
          </Button>
        </div>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Danh sách bài giảng" value="1" />
                <Tab label="Danh sách học viên" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div>
                <div className="hidden sm:block">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">STT</TableCell>
                          <TableCell>Bài giảng</TableCell>
                          <TableCell align="center">Thời lượng</TableCell>
                          <TableCell align="center">Ngày tạo</TableCell>
                          <TableCell align="center">Loại bài giảng</TableCell>
                          <TableCell align="center">Lượt hoàn thành</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows_lesson.map((row, index) => (
                          <TableRow key={row.name}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="center">{row.timelesson} Câu</TableCell>
                            <TableCell align="center">{row.timecreate}</TableCell>
                            <TableCell align="center">{row.typelesson}</TableCell>
                            <TableCell align="center">{row.done}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <div className="block md:hidden grid-cols-1">
                  {rows_lesson.map((item, index) => (
                    <div key={index}>
                      <SttLesson
                        id={item.id}
                        name={item.name}
                        timelesson={item.timelesson}
                        timecreate={item.timecreate}
                        typelesson={item.typelesson}
                        done={item.done}
                      ></SttLesson>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="hidden sm:block">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell>Học viên</TableCell>
                        <TableCell align="center">Ngày tham gia</TableCell>
                        <TableCell align="center">Chi tiết</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows_student.map((row, index) => (
                        <TableRow key={row.name}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell component="th" scope="row">
                            <div className="flex items-center">
                              <Avatar alt={row.name} src={row.avatar} />
                              <span className="ml-5">{row.name}</span>
                            </div>
                          </TableCell>
                          <TableCell align="center">{row.timejoin}</TableCell>
                          <TableCell align="center">
                            <IconButton onClick={() => handleButtonClick(row.id)}>
                              <LaunchIcon fontSize="small"></LaunchIcon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="block md:hidden grid-cols-1">
                {rows_student.map((item, index) => (
                  <div key={index}>
                    <SttStudent
                      id={item.id}
                      name={item.name}
                      avatar={item.avatar}
                      timejoin={item.timejoin}
                      onclick={() => handleButtonClick(item.id)}
                    ></SttStudent>
                  </div>
                ))}
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
};
export default CourseStatisticsDetail;
