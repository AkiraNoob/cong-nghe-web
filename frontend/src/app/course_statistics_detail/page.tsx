'use client';
import EditIcon from '@mui/icons-material/Edit';
import LaunchIcon from '@mui/icons-material/Launch';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Button, ButtonProps, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import React from 'react';
import HeaderComponent from '~/components/header_component';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(grey[900]),
  backgroundColor: grey[900],
  '&:hover': {
    backgroundColor: grey[800],
  },
}));

function CourseStatisticData_Lesson(
  id: string,
  name: string,
  timelesson: number,
  timecreate: string,
  typelesson: string,
  done: number
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

function CourseStatisticData_Student(
  id: string,
  name: string,
  avatar : string,
  timejoin: string,
) {
  return { id, name, avatar, timejoin };
}

const rows_student = [
  CourseStatisticData_Student('1', 'Nguyễn Trung Tính', '/images/avatar.jpeg', '30/12/2023' ),
  CourseStatisticData_Student('2', 'Nguyễn Trung Tính', '/images/avatar.jpeg', '30/12/2023' ),
  CourseStatisticData_Student('3', 'Nguyễn Trung Tính', '/images/avatar.jpeg', '30/12/2023' ),
  CourseStatisticData_Student('4', 'Nguyễn Trung Tính', '/images/avatar.jpeg', '30/12/2023' ),
  CourseStatisticData_Student('5', 'Nguyễn Trung Tính', '/images/avatar.jpeg', '30/12/2023' ),
]

const CourseStatisticsDetail: React.FC  = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleButtonClick = (data: string) =>{
    
  };
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <div className='pr-10 pl-10 pb-10 pt-5'>
        <div>
          <h2 className="text-3xl font-bold mb-3">Thống kê chi tiết khóa học</h2>
          <h2 className="text-2xl font-bold mb-3">Lập Trình JavaScript Cơ Bản</h2>
          <div className='w-1/2 mb-3'>
              <span className='text-gray-600'>
              JavaScript is a programming language that adds interactivity to your website
               (for example games, responses when buttons are pressed or data is entered in forms, dynamic styling, andanimation). 
               This article helps you get started with this exciting language and gives you an idea of what is possible.
              </span>
          </div>
          <ColorButton variant="contained" startIcon = {<EditIcon/>}>
              Chỉnh sửa khóa học
          </ColorButton>
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
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                      <StyledTableCell align='center'>STT</StyledTableCell>
                        <StyledTableCell>Bài giảng</StyledTableCell>
                        <StyledTableCell align="center">Thời lượng</StyledTableCell>
                        <StyledTableCell align="center">Ngày tạo</StyledTableCell>
                        <StyledTableCell align="center">Loại bài giảng</StyledTableCell>
                        <StyledTableCell align="center">Lượt hoàn thành</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows_lesson.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell align='center'>{row.id}</StyledTableCell>
                          <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                          <StyledTableCell align="center">{row.timelesson} Câu</StyledTableCell>
                          <StyledTableCell align="center">{row.timecreate}</StyledTableCell>
                          <StyledTableCell align="center">{row.typelesson}</StyledTableCell>
                          <StyledTableCell align='center'>{row.done}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align='center'>STT</StyledTableCell>
                        <StyledTableCell>Học viên</StyledTableCell>
                        <StyledTableCell align="center">Ngày tham gia</StyledTableCell>
                        <StyledTableCell align="center">Chi tiết</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows_student.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell align='center'>{row.id}</StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            <div className='flex items-center'>
                            <Avatar alt= {row.name} src={row.avatar} />
                            <span className='ml-5'>{row.name}</span>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align='center'>{row.timejoin}</StyledTableCell>
                          <StyledTableCell align="center">
                              <button onClick={ () => handleButtonClick(row.id)}>
                                <LaunchIcon fontSize='small'></LaunchIcon>
                              </button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  )
}
export default CourseStatisticsDetail;