"use client";
import React, { useState } from 'react';
import HeaderComponent from '~/components/header_component';
const HomePage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <div>
        <HeaderComponent></HeaderComponent>
    </div>
  );
};


export default HomePage;