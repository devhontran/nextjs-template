'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import VideoContent from '../VideoContent';
import { useVideoContentAnimation } from '../VideoContent/useVideoContentAnimation';
import s from './styles.module.scss';

export default function SectionPart1({ index }: { index: number }): React.ReactElement {
  const refVideoControls = useRef<{ play: () => void; pause: () => void }>({
    play: () => null,
    pause: () => null,
  });
  const refContent = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const fades = refContent.current?.querySelectorAll('.js-fade');
    if (fades) {
      gsap.set(fades, {
        opacity: 0,
        yPercent: 10,
      });
    }
  });

  const animationIn = (): void => {
    const fades = refContent.current?.querySelectorAll('.js-fade');
    if (fades) {
      gsap.fromTo(
        fades,
        {
          opacity: 0,
          yPercent: 10,
        },
        {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.05,
        }
      );
    }
  };
  const animationOut = (): void => {
    const fades = refContent.current?.querySelectorAll('.js-fade');
    if (fades) {
      gsap.to(fades, {
        opacity: 0,
        yPercent: -10,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.015,
      });
    }
  };

  useVideoContentAnimation({
    index,
    refVideoControls,
    animationIn,
    animationOut,
  });

  return (
    <VideoContent ref={refVideoControls} videoSrc="/videos/1.mp4">
      <div className={s.content} ref={refContent}>
        <h2 className={`${s.heading} js-fade`}>Innovative</h2>
        <div className={`${s.text} js-fade`}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>
      </div>
    </VideoContent>
  );
}
