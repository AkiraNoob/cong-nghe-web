'use client';
import AddIcon from '@mui/icons-material/Add';
import LaunchIcon from '@mui/icons-material/Launch';
import StarIcon from '@mui/icons-material/Star';
import { Button, ButtonProps, CardMedia } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { grey, yellow } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
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

function CourseStatisticData(
  id: string,
  name: string,
  numberlesson: number,
  time: string,
  numbermember: number,
  rating: number,
  image: string
) {
  return { id, name, numberlesson, time, numbermember, rating, image };
}

const rows = [
  CourseStatisticData('1', 'Lập trình C/C++', 159, '12/03/2023', 24, 4.0, '/images/cplusplus.jpg'),
  CourseStatisticData('2', 'Lập trình Java trên thiết bị di động', 237, '12/03/2023', 37, 4.3, '/images/java.jpg'),
  CourseStatisticData('3', 'Lập trình moblie với React Native', 262, '12/03/2023', 24, 6.0, '/images/cplusplus.jpg'),
  CourseStatisticData('4', 'Lập trình Web', 305, '12/03/2023', 67, 4.3, '/images/java.jpg'),
  CourseStatisticData('5', 'Lập trình Game với Unity', 356, '12/03/2023', 49, 3.9, '/images/cplusplus.jpg'),
];
const CourseStatistics: React.FC = () => {

  const handleButtonClick = (data: string) =>{
    
  };

  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <div className='pr-10 pl-10 pb-10 pt-5'>
        <div className='flex justify-between pb-5'>
          <h2 className="text-3xl font-bold mb-3">Thống kê khóa học</h2>
          <ColorButton variant="contained" startIcon = {<AddIcon/>}>
              Thêm khóa học
          </ColorButton>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>STT</StyledTableCell>
                <StyledTableCell>Khóa học</StyledTableCell>
                <StyledTableCell align="center">Số lương bài giảng</StyledTableCell>
                <StyledTableCell align="center">Ngày tạo</StyledTableCell>
                <StyledTableCell align="center">Số lượng học viên tham gia</StyledTableCell>
                <StyledTableCell align="center">Đánh giá</StyledTableCell>
                <StyledTableCell align="center">Chi tiết khóa học</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align='center'>{row.id}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <div className='flex items-center'>
                    <CardMedia sx={{ height: 70, width: 90, borderRadius: 1, display: "flex" }} image={row.image} title="green iguana"></CardMedia>
                    <span className='ml-5'>{row.name}</span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.numbermember}</StyledTableCell>
                  <StyledTableCell align="center">{row.time}</StyledTableCell>
                  <StyledTableCell align="center">{row.numberlesson}</StyledTableCell>
                  <StyledTableCell align="center">
                    <div>
                      <span>{row.rating}/5</span>
                      <StarIcon sx={{ color: yellow[700], fontSize: 25, marginBottom: 0.5}}></StarIcon>
                    </div>
                  </StyledTableCell>
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
    </div>
  )
}
export default CourseStatistics;
