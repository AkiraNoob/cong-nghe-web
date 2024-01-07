'use client';
import { People } from '@mui/icons-material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Card, CardMedia, ListItemIcon, MenuItem, Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import routePath from '~/constant/routePath';
import { generatePathname } from '~/helper/generatePathname';
interface CourseComponentProps {
  id: string;
  image: string;
  name: string;
  date: string;
  views: number;
}
const CourseComponent: React.FC<CourseComponentProps> = ({ id, image, name, date, views }) => {
  const router = useRouter();
  const onClickCourse = () => {
    router.push(
      generatePathname({
        pathName: routePath.COURSE_DETAIL,
        query: {
          courseId: id,
        },
      }),
    );
  };

  return (
    <div className="relative rounded-2xl" onClick={onClickCourse}>
      <Card>
        <CardMedia sx={{ height: 200 }} image={image} title="green iguana" />
        <div className="rounded-tr pt-2 pl-3 pr-3">
          <h1 className="font-bold">{name}</h1>
        </div>
        <div className="flex flex-wrap">
          <MenuItem>
            <ListItemIcon>
              <People fontSize="small" />
              <span className="text-sm ml-1">{views} Lượt xem</span>
            </ListItemIcon>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <CalendarMonthIcon fontSize="small" />
              <span className="text-sm ml-1">Ngày tạo: {date && new Date(date).toLocaleDateString()}</span>
            </ListItemIcon>
          </MenuItem>
        </div>
      </Card>
      <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
        <button className="bg-white text-black px-4 py-2 rounded-2xl transition-colors">Xem khóa học</button>
      </div>
    </div>
  );
};
export default CourseComponent;
