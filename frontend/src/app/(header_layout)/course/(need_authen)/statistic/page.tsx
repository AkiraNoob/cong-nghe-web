'use client';
import LaunchIcon from '@mui/icons-material/Launch';
import StarIcon from '@mui/icons-material/Star';
import { CardMedia, IconButton, Skeleton, TableCell } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { yellow } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import AddCourseButton from '~/components/course/add_course_button';
import SttCourse from '~/components/statistics/stt_course';
import routePath from '~/constant/routePath';
import { generatePathname } from '~/helper/generatePathname';
import useCourseStatistic from '~/hooks/statistic/useCourseStatistic';

function CourseStatisticData(
  id: string,
  name: string,
  numberlesson: number,
  time: string,
  numbermember: number,
  rating: number,
  image: string,
) {
  return { id, name, numberlesson, time, numbermember, rating, image };
}

const CourseStatistics: React.FC = () => {
  const { data, isSuccess } = useCourseStatistic();

  const router = useRouter();

  const handleButtonClick = (data: string) => {
    router.push(
      generatePathname({
        pathName: routePath.COURSE_STATISTIC_COURSE_DETAIL,
        query: {
          courseId: data,
        },
      }),
    );
  };

  if (data && isSuccess) {
    return (
      <>
        <div className="pr-10 pl-10 pb-10 pt-5">
          <div className="sm:flex sm:justify-between pb-5">
            <h2 className="text-3xl font-bold mb-3">Thống kê khóa học</h2>
            <AddCourseButton />
          </div>
          <TableContainer component={Paper} className="hidden sm:block">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">STT</TableCell>
                  <TableCell>Khóa học</TableCell>
                  <TableCell align="center">Số lương bài giảng</TableCell>
                  <TableCell align="center">Ngày tạo</TableCell>
                  <TableCell align="center">Số lượng học viên tham gia</TableCell>
                  <TableCell align="center">Đánh giá</TableCell>
                  <TableCell align="center">Chi tiết khóa học</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      <div className="flex items-center">
                        <CardMedia
                          sx={{ height: 70, width: 90, borderRadius: 1, display: 'flex' }}
                          image={row.cover}
                          title="green iguana"
                        ></CardMedia>
                        <span className="ml-5">{row.title}</span>
                      </div>
                    </TableCell>
                    <TableCell align="center">{row.participantsId.length}</TableCell>
                    <TableCell align="center">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{row.lessonIds.length}</TableCell>
                    <TableCell align="center">
                      <div>
                        <span>{row.rating}/5</span>
                        <StarIcon sx={{ color: yellow[700], fontSize: 25, marginBottom: 0.5 }}></StarIcon>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleButtonClick(row._id)}>
                        <LaunchIcon fontSize="small"></LaunchIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="block md:hidden grid-cols-1">
            {data.map((item, index) => (
              <div key={index}>
                <SttCourse
                  id={item._id}
                  name={item.title}
                  numberlesson={item.lessonIds.length}
                  time={item.createdAt}
                  numbermember={item.participantsId.length}
                  rating={item.rating}
                  image={item.cover}
                  onClick={() => handleButtonClick(item._id)}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {new Array(10).fill(0).map((_, index) => (
        <div key={index}>
          <Skeleton height={60} width={'100%'} variant="rounded" />
        </div>
      ))}
    </>
  );
};
export default CourseStatistics;
