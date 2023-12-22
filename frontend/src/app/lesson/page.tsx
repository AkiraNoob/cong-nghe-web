'use client';
import React from 'react';
import HeaderComponent from '~/components/header_component';
import YouTubePlayer from '~/components/videoplayer_component';

const LessonPage: React.FC = (videoId) => {
  // Data simple

  // Add more data items as needed
  const handleClick = (param: String): void => {};
  return (
    <div>
      <div>
        <HeaderComponent></HeaderComponent>
      </div>
      <YouTubePlayer videoId="-jV06pqjUUc" />
    </div>
  );
};

export default LessonPage;
