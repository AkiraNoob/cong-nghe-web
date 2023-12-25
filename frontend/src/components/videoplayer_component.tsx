// import React from 'react';
// import YouTube from 'react-youtube';

// const YouTubePlayer: React.FC = ({ videoId }) => {
//   // Set up event handlers
//   const onReady = (event: any) => {
//     // Access the player instance
//     const player = event.target;

//     // For example, you can automatically play the video
//     player.playVideo();
//   };

//   const onError = (error: any) => {
//     console.error('YouTube Player Error:', error);
//   };

//   return (
//     <div>
//       <YouTube>
//         videoId={videoId} onReady={onReady} onError={onError}{' '}
//       </YouTube>
//     </div>
//   );
// };

// export default YouTubePlayer;
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
