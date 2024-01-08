import LaunchIcon from '@mui/icons-material/Launch';
import StarIcon from '@mui/icons-material/Star';
import { CardMedia } from '@mui/material';
import { yellow } from '@mui/material/colors';
import moment from 'moment';
import React from 'react';
interface SttCourseProps {
  id: string;
  name: string;
  numberlesson: number;
  time: string;
  numbermember: number;
  rating: number;
  image: string;
  onClick: (data: string) => void;
}
const SttCourse: React.FC<SttCourseProps> = ({
  id,
  name,
  numberlesson,
  time,
  numbermember,
  rating,
  image,
  onClick,
}) => {
  return (
    <div className="border border-gray-400 rounded-2xl mb-6">
      <div className="p-5">
        <div className="flex items-center">
          <CardMedia
            sx={{ height: 70, width: 90, borderRadius: 1, display: 'flex' }}
            image={image}
            title="green iguana"
          ></CardMedia>
          <span className="ml-5 font-bold">{name}</span>
        </div>
        <div className="border border-gray-300 mt-4"></div>
        <div className="flex justify-between mt-4">
          <span>
            <b>Số lượng bài giảng</b>
          </span>
          <span>{numberlesson} Câu</span>
        </div>
        <div className="flex justify-between mt-4">
          <span>
            <b>Ngày tạo</b>
          </span>
          <span>{moment(time).format('DD/MM/YYYY')}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span>
            <b>Số lượng học viên tham gia</b>
          </span>
          <span>{numbermember}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span>
            <b>Đánh giá</b>
          </span>
          <div>
            <span>{rating}/5</span>
            <StarIcon sx={{ color: yellow[700], fontSize: 25, marginBottom: 0.5 }}></StarIcon>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <span>
            <b>Chi tiết</b>
          </span>
          <button onClick={() => onClick}>
            <LaunchIcon fontSize="small"></LaunchIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SttCourse;
