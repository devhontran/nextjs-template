'use client';

import gsap from 'gsap';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';

import useAnimate from '@/animation/hooks/useAnimate';
import type { IAnimationProps } from '@/types/animation';

interface IMaskBox extends PropsWithChildren {
  motion?: IAnimationProps;
  className?: string;
}

export default function MotionFadeBox({ children, motion, className }: IMaskBox): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  const animate = (gsapWars: gsap.TweenVars): void => {
    if (!refContent.current) return;

    gsap.fromTo(
      refContent.current,
      { opacity: 0, y: 34, ...motion?.from },
      {
        ...gsapWars,
        opacity: 1,
        y: 0,
        ease: 'power3.inOut',
        duration: 1,
        ...motion?.to,
      }
    );
  };

  useAnimate({ refContent, motion, animate });
  return (
    <div ref={refContent} className={className}>
      {children}
    </div>
  );
}
