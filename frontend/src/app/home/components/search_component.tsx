"use client";
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from "react";
interface SearchProps{
  onSearch: (query: String) => void
}

const SearchComponent: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg">
      <SearchIcon 
        onClick = {handleSearch}
        className=''
      ></SearchIcon>
      <input
        type="text"
        placeholder="Nhập tên khóa học cần tìm...."
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchComponent;