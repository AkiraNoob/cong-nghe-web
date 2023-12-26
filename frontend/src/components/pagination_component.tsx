'use client';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListIcon from '@mui/icons-material/List';
import React from 'react';

const PaginationComponent: React.FC = () => {
  return (
    <footer className="fixed flex justify-between bottom-0 left-0 right-0 bg-gray-200 py-4">
      <div className="flex justify-center space-x-4 flex-1">
        <a
          href="#"
          className="flex items-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <ArrowBackIosNewIcon fontSize="small"></ArrowBackIosNewIcon>
          Bài học trước
        </a>
        <a
          href="#"
          className="flex items-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Bài học sau
          <ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>
        </a>
      </div>
      <div>
        <a
          href="#"
          className="flex items-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <ListIcon></ListIcon>
          Danh sách bài học
        </a>
      </div>
    </footer>
  );
};
export default PaginationComponent;
