"use client";
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from "react";

interface SearchProps{
  onSearch: (query: String) => void
}

const SearchComponent: React.FC<SearchProps> = ({ onSearch }) => {

  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(query);
  };
  const DeleteText = () => {
    setQuery("");
  }

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
      <div 
        className = {isFocused ? "border border-black rounded-2xl flex-1 h-10 px-2 sm:px-4 transition duration-200 w-96" : "border border-gray-300 rounded-2xl flex-1 h-10 px-2 sm:px-4 transition duration-200 w-96"}>
        <SearchIcon
          className='opacity-70  mr-2'
        ></SearchIcon>
        <input
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Nhập tên khóa học cần tìm kiếm...."
          value={query}
          className='border-none flex-1 h-full outline-none px-0 sm:px-4 type="text" text-sm w-9/12'
          onChange={handleInputChange}
        />
        {query != "" && (
          <CancelIcon 
          onClick = {DeleteText}
          className='object-right opacity-50 ml-4'
        ></CancelIcon>
        )}
      </div>
  );
};

export default SearchComponent;