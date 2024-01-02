import React from 'react';

interface SttLessonProps{
  id: string,
  name: string,
  timelesson: number,
  timecreate: string,
  typelesson: string,
  done: number
}

const SttLesson: React.FC<SttLessonProps> = ({ id, name, timelesson, timecreate, typelesson, done }) => {
  return (
    <div className='border border-gray-400 rounded-2xl mb-6'>
      <div className='p-5'>
      <div className='flex items-center'>
        <span className='ml-5 font-bold'>{id}. {name}</span>
      </div>
      <div className='border border-gray-300 mt-4'></div>
      <div className='flex justify-between mt-4'>
        <span><b>Số lượng bài giảng</b></span>
        <span>{timelesson} Câu</span>
      </div>
      <div className='flex justify-between mt-4'>
        <span><b>Ngày tạo</b></span>
        <span>{timecreate}</span>
      </div>
      <div className='flex justify-between mt-4'>
        <span><b>Loại bài giảng</b></span>
        <span>{typelesson}</span>
      </div>
      <div className='flex justify-between mt-4'>
        <span><b>Lượt hoàn thành</b></span>
        <span>{done}</span>
      </div>
      </div>
    </div>
  );
};

export default SttLesson;