"use client";
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, Stack } from '@mui/material';
import React, { useState } from "react";


const SearchComponent: React.FC = () => {

  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Data simple
  const data = [
    {
      image: '/images/image1.jpg',
      name: 'Lập trình Java',
    },
    {
      image: '/images/image2.jpg',
      name: 'Lập trình Java trên ứng dụng di động',
    },
    // Add more data items as needed
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  };
  const DeleteText = () => {
    setQuery("");
  }

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsLoading(false);
  };
  return (
      <div className='relative'>
        <div 
          className = {isFocused ? "border border-black rounded-2xl flex-1 h-10 px-2 sm:px-4 transition duration-200 w-full" : "border border-gray-300 rounded-2xl flex-1 h-10 px-2 sm:px-4 transition duration-200 w-full"}>
          <SearchIcon
            className='opacity-70 lg:mr-2 w-1/12'
          ></SearchIcon>
          <input
            type="text"
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Nhập tên khóa học cần tìm kiếm...."
            value={query}
            className='border-none flex-auto h-full outline-none px-0 sm:px-4 type="text" text-sm w-9/12'
            onChange={handleInputChange}
          />
          {query != "" && (
            <CancelIcon 
            onClick = {DeleteText}
            className='object-right flex-auto opacity-50 ml-4 w-2/12'
          ></CancelIcon>
          )}
        </div>
        {query.length > 0 && (
        <div className="absolute top-full left-0 w-full rounded-lg bg-white shadow-xl z-10 mt-4">
          {/* Hiển thị các kết quả tìm kiếm */}
          {isLoading ? (
            <div className='items-center p-4'>
              <Stack sx={{ color: 'grey.500', alignItems: 'center' }} spacing={2} direction="row">
                <CircularProgress color="inherit" size={20} />
                <span className=''>Tìm &quot;{query}&quot;</span>
              </Stack>
            </div>
          ):(
            <div className='items-center p-4'>
              <SearchIcon
                className='opacity-60  mr-2'
              ></SearchIcon>
              {data == null? (
                <span className='text-gray-500'>Không có kết quả tìm kiếm cho &quot;{query}&quot;</span>
              ):(
                <span className='text-gray-500'>Kết quả tìm kiếm cho &quot;{query}&quot;</span>
              )}
              
            </div>
          )}
          
        </div>
      )}

    </div>
      
  );
};

export default SearchComponent;