import React from 'react';
import { TGetMemberOfCourseStatisticResponse } from '~/types/api/statistic.types';

interface SttDetailMemberProps extends TGetMemberOfCourseStatisticResponse {
  parseResult: string;
  parseStatus: string;
}

const SttDetailMember: React.FC<SttDetailMemberProps> = ({
  _id,
  title,
  type,
  duration,
  parseResult,
  parseStatus,
  createdAt,
}) => {
  return (
    <div key={_id} className="border border-gray-400 rounded-2xl mb-6">
      <div className="p-5">
        <div className="flex items-center">
          <span className="font-bold">{title}</span>
        </div>
        <div className="border border-gray-300 mt-4"></div>
        <div className="flex justify-between mt-4">
          <span>
            <b>Thời lượng</b>
          </span>
          <span>{duration}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span>
            <b>Ngày tạo</b>
          </span>
          <span>{createdAt}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span>
            <b>Loại bài giảng</b>
          </span>
          <span>{type}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span>
            <b>Trạng thái</b>
          </span>
          <span>{parseStatus}</span>
        </div>
        <div className="flex justify-between mt-4">
          <span>
            <b>Điểm số</b>
          </span>
          <span>{parseResult}</span>
        </div>
      </div>
    </div>
  );
};

export default SttDetailMember;
