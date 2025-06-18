'use client';

import type { Signal } from '@preact/signals-react';
import { useSignal } from '@preact/signals-react';
import type { ReactNode } from 'react';
import React, { createContext, use, useMemo } from 'react';

interface FeaturePodcastContext {
  muted: Signal<boolean>;
  volume: Signal<number>;
  isPlaying: Signal<boolean>;
  currentTime: Signal<number>;
  duration: Signal<number>;
  playbackRate: Signal<number>;
  activePodcast: Signal<PodcastCardProps | null>;
  activePodcastIndex: Signal<number>;

  totalTimePodcast: Signal<number>;
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (currentTime: number) => void;
  setDuration: (duration: number) => void;
  setPlaybackRate: (playbackRate: number) => void;
  setActivePodcastIndex: (activePodcastIndex: number) => void;
  setTotalTimePodcast: (totalTimePodcast: number) => void;
  setActivePodcast: (activePodcast: PodcastCardProps | null) => void;
}

const FeaturePodcastContext = createContext<FeaturePodcastContext | undefined>(undefined);

export const usePodcast = (): FeaturePodcastContext => {
  const context = use(FeaturePodcastContext);

  if (!context) {
    throw new Error('usePodcast must be used within a FeaturePodcastProvider');
  }

  return context;
};

interface Props {
  children: ReactNode;
}

const FeaturePodcastProvider: React.FC<Props> = ({ children }) => {
  const muted = useSignal<boolean>(false);
  const volume = useSignal<number>(0.5);
  const isPlaying = useSignal<boolean>(false);
  const currentTime = useSignal<number>(0);
  const duration = useSignal<number>(0);
  const playbackRate = useSignal<number>(1);
  const activePodcast = useSignal<PodcastCardProps | null>(null);
  const activePodcastIndex = useSignal<number>(0);
  const totalTimePodcast = useSignal<number>(0);
  const setMuted = (mutedValue: boolean): void => {
    muted.value = mutedValue;
  };

  const setVolume = (volumeValue: number): void => {
    volume.value = volumeValue;
  };

  const setIsPlaying = (isPlayingValue: boolean): void => {
    isPlaying.value = isPlayingValue;
  };

  const setCurrentTime = (currentTimeValue: number): void => {
    currentTime.value = currentTimeValue;
  };

  const setDuration = (durationValue: number): void => {
    duration.value = durationValue;
  };

  const setPlaybackRate = (playbackRateValue: number): void => {
    playbackRate.value = playbackRateValue;
  };

  const setActivePodcastIndex = (activePodcastIndexValue: number): void => {
    activePodcastIndex.value = activePodcastIndexValue;
  };

  const setTotalTimePodcast = (totalTimePodcastValue: number): void => {
    // eslint-disable-next-line react-compiler/react-compiler
    totalTimePodcast.value = totalTimePodcastValue;
  };

  const setActivePodcast = (activePodcastValue: PodcastCardProps | null): void => {
    activePodcast.value = activePodcastValue;
    setCurrentTime(0);
  };

  const contextValue = useMemo(
    () => ({
      muted,
      volume,
      isPlaying,
      currentTime,
      duration,
      playbackRate,
      activePodcast,
      setMuted,
      setVolume,
      setIsPlaying,
      setCurrentTime,
      setDuration,
      setPlaybackRate,
      activePodcastIndex,
      setActivePodcastIndex,
      totalTimePodcast,
      setTotalTimePodcast,
      setActivePodcast,
    }),
    [
      muted,
      volume,
      isPlaying,
      currentTime,
      duration,
      playbackRate,
      activePodcast,
      activePodcastIndex,
      totalTimePodcast,
      setTotalTimePodcast,
      setActivePodcast,
      setIsPlaying,
    ]
  );

  return <FeaturePodcastContext value={contextValue}>{children}</FeaturePodcastContext>;
};

export default FeaturePodcastProvider;
