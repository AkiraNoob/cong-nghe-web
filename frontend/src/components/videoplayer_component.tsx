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

import React from 'react';
import YouTube, { Options } from 'react-youtube';

interface YouTubePlayerProps {
  videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  const opts: Options = {
    height: '520',
    width: '1040',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="bg-zinc-950">
      <div>
        <YouTube
          videoId={videoId}
          opts={opts}
          className="absolute top-0 left-0 w-full h-full relative flex justify-center items-center aspect-w-16 aspect-h-9"
        />
      </div>
    </div>
  );
};

export default YouTubePlayer;
