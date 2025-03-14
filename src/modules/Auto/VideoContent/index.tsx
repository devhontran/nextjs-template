import { useGSAP } from '@gsap/react';
import cn from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImperativeHandle, useLayoutEffect, useRef } from 'react';

import { useVideoContent } from '../VideoContentContext';
import s from './styles.module.scss';
gsap.registerPlugin(ScrollTrigger);

export default function VideoContent({
  ref,
  children,
  className,
  videoSrc,
}: {
  ref: React.RefObject<{ play: () => void; pause: () => void }>;
  children: React.ReactNode;
  className?: string;
  videoSrc: string;
}): React.ReactElement {
  const refVideo = useRef<HTMLVideoElement>(null);
  const refWrapper = useRef<HTMLDivElement>(null);
  const { isPlaying } = useVideoContent();

  useGSAP(() => {
    gsap.set(refWrapper.current, { pointerEvents: 'none' });
    gsap.set(refVideo.current, {
      opacity: 0,
    });
  });

  useImperativeHandle(ref, () => {
    return {
      play: (): void => {
        if (refVideo.current) {
          isPlaying.value = true;
          gsap.set(refWrapper.current, { pointerEvents: 'auto' });
          refVideo.current.play().catch(() => {
            // eslint-disable-next-line no-console
            console.error('Video not playable');
          });
          gsap.to(refVideo.current, { opacity: 1, ease: 'power2.inOut', duration: 0.1 });
        }
      },
      pause: (): void => {
        if (refVideo.current) {
          isPlaying.value = false;
          refVideo.current.pause();
          gsap.to(refVideo.current, { opacity: 0, ease: 'power2.inOut', duration: 0.1 });
          gsap.set(refWrapper.current, { pointerEvents: 'none' });
        }
      },
    };
  });

  useLayoutEffect(() => {
    const onVideoEnded = (): void => {
      isPlaying.value = false;
    };

    refVideo.current?.addEventListener('ended', onVideoEnded);

    return (): void => {
      refVideo.current?.removeEventListener('ended', onVideoEnded);
    };
  }, []);
  return (
    <div className={cn(s.videoContent, className)} ref={refWrapper}>
      <div className={s.content}>{children}</div>
      <div className={s.video}>
        <video ref={refVideo} src={videoSrc} muted playsInline />
      </div>
    </div>
  );
}
