'use client';

import type { Signal } from '@preact/signals-react';
import { useSignal } from '@preact/signals-react';
import type { PropsWithChildren, ReactElement } from 'react';
import { createContext, use } from 'react';

interface VideoContentContextProps {
  isPlaying: Signal<boolean>;
  videoIndex: Signal<number>;
  videoIndexPrev: Signal<number>;
  gotoSection: (index: number) => void;
}

export const VideoContentContext = createContext<VideoContentContextProps | null>(null);
export function useVideoContent(): VideoContentContextProps {
  const context = use(VideoContentContext);
  if (!context) {
    throw new Error('useVideoContent must be used within VideoContentProvider');
  }
  return context;
}
export const VideoContentProvider = ({ children }: PropsWithChildren): ReactElement => {
  const isPlaying = useSignal(false);
  const videoIndex = useSignal(0);
  const videoIndexPrev = useSignal(0);

  const gotoSection = (index: number): void => {
    // eslint-disable-next-line react-compiler/react-compiler
    videoIndexPrev.value = videoIndex.value;
    videoIndex.value += index;
  };

  const contextValue = {
    isPlaying,
    videoIndex,
    videoIndexPrev,
    gotoSection,
  };

  return <VideoContentContext value={contextValue}>{children}</VideoContentContext>;
};
