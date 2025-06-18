'use client';

import cn from 'classnames';
import dynamic from 'next/dynamic';
import { useEffect, useMemo } from 'react';

import { useAssetsContext } from '@/animation/contexts/AssetsContext';
import { useVimeoVideo } from '@/hooks/useVimeoVideo';

const ReactHlsPlayer = dynamic(() => import('react-hls-player'), { ssr: false });

interface Props {
  vimeo?: string;
  src?: string;
  onClick?: () => void;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  poster?: string;
  className?: string;
  onLoadStart?: () => void;
  onLoadedMetadata?: () => void;
  playsInline?: boolean;
  controls?: boolean;
  disablePictureInPicture?: boolean;
  disableRemotePlayback?: boolean;
  controlsList?: string;
  onContextMenu?: (e: React.MouseEvent<HTMLVideoElement>) => void;
  width?: number;
  height?: number;
  preload?: 'none' | 'metadata' | 'auto';
  onEnded?: () => void;
  playerRef: React.RefObject<HTMLVideoElement>;
}

const VideoStream = ({
  playerRef,
  vimeo,
  src,
  onClick,
  loop = true,
  muted = true,
  autoPlay,
  className,
  onLoadStart,
  onLoadedMetadata,
  playsInline = true,
  controls,
  disablePictureInPicture,
  disableRemotePlayback,
  controlsList,
  poster,
  onContextMenu,
  width,
  height,
  preload = 'metadata',
  onEnded,
}: Props): React.ReactElement => {
  const { videoInfo, fetchVideo } = useVimeoVideo();
  const { registerAssets, unRegisterAssets } = useAssetsContext();

  useEffect(() => {
    const videoUrl = vimeo ?? src ?? '';
    let vimeoId = null;

    // Match pattern: /123456789.m3u8
    const m3u8Match = /\/(\d+)\.m3u8/.exec(videoUrl);
    if (m3u8Match?.[1]) {
      vimeoId = m3u8Match[1];
    }

    // Match pattern: vimeo.com/123456789
    const vimeoUrlMatch = /vimeo\.com\/(\d+)/.exec(videoUrl);
    if (!vimeoId && vimeoUrlMatch?.[1]) {
      vimeoId = vimeoUrlMatch[1];
    }

    // Match pattern: player.vimeo.com/video/123456789
    const playerUrlMatch = /player\.vimeo\.com\/video\/(\d+)/.exec(videoUrl);
    if (!vimeoId && playerUrlMatch?.[1]) {
      vimeoId = playerUrlMatch[1];
    }

    // Direct ID check (if just the ID is passed)
    const directIdMatch = /^(\d+)$/.exec(videoUrl);
    if (!vimeoId && directIdMatch?.[1]) {
      vimeoId = directIdMatch[1];
    }

    const vimeoIdMatch = vimeoId ? [null, vimeoId] : null;

    if (vimeoIdMatch?.[1]) {
      const vimeoId = vimeoIdMatch[1];
      void fetchVideo(vimeoId);
    }
  }, [vimeo, src]);

  const posterUrl = useMemo(() => {
    return poster ?? videoInfo?.pictures.base_link;
  }, [poster, videoInfo]);

  const videoUrl = useMemo(() => {
    return (
      vimeo ?? src ?? videoInfo?.play.progressive[videoInfo.play.progressive.length - 1]?.link ?? ''
    );
  }, [videoInfo, vimeo, src]);

  const onFetch = (el: HTMLVideoElement): void => {
    if (autoPlay) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        registerAssets();
      }
    }
  };

  const onFetched = (el: HTMLVideoElement): void => {
    if (autoPlay) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        unRegisterAssets();
      }
    }
  };

  return (
    <ReactHlsPlayer
      className={cn('js-video-stream', className)}
      playerRef={playerRef}
      src={videoUrl}
      muted={muted}
      autoPlay={autoPlay}
      playsInline={playsInline}
      loop={loop}
      poster={posterUrl}
      preload={preload}
      onEnded={onEnded}
      onClick={onClick}
      onLoadStart={(target) => {
        onFetch(target.target as HTMLVideoElement);
        onLoadStart?.();
      }}
      onLoadedMetadata={(target) => {
        onFetched(target.target as HTMLVideoElement);
        onLoadedMetadata?.();
      }}
      onError={(target) => {
        onFetched(target.target as HTMLVideoElement);
      }}
      controls={controls}
      disablePictureInPicture={disablePictureInPicture}
      disableRemotePlayback={disableRemotePlayback}
      controlsList={controlsList}
      onContextMenu={onContextMenu}
      width={width ?? 1600}
      height={height ?? 900}
    />
  );
};

VideoStream.displayName = 'VideoStream';

export default VideoStream;
