import { useSignalEffect } from '@preact/signals-react';

import { useVideoContent } from '../VideoContentContext';

interface UseVideoContentAnimationProps {
  index: number;
  refVideoControls: React.RefObject<{ play: () => void; pause: () => void }>;
  animationIn: () => void;
  animationOut: () => void;
}

export const useVideoContentAnimation = ({
  index,
  animationIn,
  animationOut,
  refVideoControls,
}: UseVideoContentAnimationProps): void => {
  const { videoIndex, videoIndexPrev, isPlaying } = useVideoContent();

  useSignalEffect(() => {
    if (videoIndex.value === index) {
      refVideoControls.current.play();
    } else if (videoIndexPrev.peek() === index) {
      refVideoControls.current.pause();
    }
  });

  useSignalEffect(() => {
    if (isPlaying.value) return;

    if (videoIndex.value === index) {
      animationIn();
    } else if (videoIndexPrev.peek() === index) {
      animationOut();
    }
  });
};
