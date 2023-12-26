'use client';
import { CldVideoPlayer } from 'next-cloudinary';
import React from 'react';

interface VideoPlayerProps {
  publicId: string;
}
const VideoPlayer: React.FC<VideoPlayerProps> = ({ publicId }) => {
  return (
    <div>
      <CldVideoPlayer src={publicId} controls width="640" height="360" />
    </div>
  );
};

export default VideoPlayer;
