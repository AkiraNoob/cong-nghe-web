"use client";
import React from 'react';
import SearchComponent from '../components/search_component';
const HomePage: React.FC = () => {
  const handleSearch = (query: String) => {
    // Xử lý logic tìm kiếm dựa trên query
    console.log('Perform search with query:', query);
  };

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
    </div>
  );
};

export default HomePage;