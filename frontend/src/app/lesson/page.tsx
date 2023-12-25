'use client';
import 'next-cloudinary/dist/cld-video-player.css';
import React from 'react';
import HeaderComponent from '~/components/header_component';
import PaginationComponent from '~/components/pagination_component';
import VideoPlayer from '~/components/videoplayer_component';
const LessonPage: React.FC = () => {
  // Data simple
  const videoPublicId = 'lesson1';
  // Add more data items as needed

  return (
    <div>
      <div>
        <HeaderComponent></HeaderComponent>
      </div>
      <div className="container mx-auto max-w-full bg-black">
        <div className="max-w-4xl mx-auto">
          <VideoPlayer publicId={videoPublicId} />
        </div>
      </div>
      <div>
        <PaginationComponent></PaginationComponent>
      </div>
    </div>
  );
};

export default LessonPage;
