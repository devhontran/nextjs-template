'use client';

import { useCallback, useState } from 'react';

import { useAssetsContext } from '@/animation/contexts/AssetsContext';
import { getVimeoVideoInfo } from '@/app/actions/vimeo';

interface UseVimeoVideoReturn {
  videoInfo: SimpleVimeo | null;
  isLoading: boolean;
  error: string | null;
  fetchVideo: (videoId: string) => Promise<void>;
}

export function useVimeoVideo(): UseVimeoVideoReturn {
  const [videoInfo, setVideoInfo] = useState<SimpleVimeo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { registerAssets, unRegisterAssets } = useAssetsContext();

  const fetchVideo = useCallback(async (videoId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      registerAssets();
      const response = await getVimeoVideoInfo(videoId);

      if (response.error) {
        setError(response.error);
        setVideoInfo(null);
      } else {
        setVideoInfo(response.data);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setError('Failed to fetch video information');
      setVideoInfo(null);
      unRegisterAssets();
    } finally {
      setIsLoading(false);
      unRegisterAssets();
    }
  }, []);

  return {
    videoInfo,
    isLoading,
    error,
    fetchVideo,
  };
}
