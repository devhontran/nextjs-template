import { chakra } from '@chakra-ui/react';
import type { ReactElement } from 'react';

export default function VideoEl({
  refVideo,
  src,
}: {
  refVideo: (el: HTMLVideoElement | null) => void;
  src: string;
}): ReactElement {
  return (
    <chakra.video
      src={src}
      ref={(el: HTMLVideoElement | null) => {
        refVideo(el);
      }}
      h="100lvh"
      w="100vw"
      objectFit="cover"
      objectPosition="center"
      preload="auto"
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      muted
      playsInline
    />
  );
}
