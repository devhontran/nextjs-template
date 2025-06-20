'use client';

import { Box } from '@chakra-ui/react';
import { useLayoutEffect, useRef } from 'react';
import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.js';

export default function VideoScrolling(): React.ReactElement {
  const videoRef = useRef<ScrollyVideo | null>(null);

  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (!videoRef.current) {
      videoRef.current = new ScrollyVideo({
        scrollyVideoContainer: 'scrolly-video',
        src: 'https://player.vimeo.com/progressive_redirect/playback/1091541013/rendition/1080p/file.mp4?loc=external&signature=0cf298da66f4f1aaed337f9c5da2185713860153eb9d05778e089f091b9409e2',
      });
    }
  }, []);

  return (
    <Box
      width="100%"
      height="500vh"
      position="relative"
      css={{
        '& [data-scrolly-container]': {
          maskImage:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%)',
        },
        '& video': {
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        },
      }}
    >
      <div id="scrolly-video" />
    </Box>
  );
}
