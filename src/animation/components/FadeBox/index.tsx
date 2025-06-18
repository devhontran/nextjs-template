'use client';

import gsap from 'gsap';
import type { PropsWithChildren, ReactElement } from 'react';
import { useImperativeHandle, useRef } from 'react';

import useAnimate from '@/animation/hooks/useAnimate';
import type { IAnimationProps } from '@/types/animation';

interface IMaskBox extends PropsWithChildren {
  motion?: IAnimationProps;
  className?: string;
  ref?: React.RefObject<IRefMotion | null>;
}

export default function MotionFadeBox({
  children,
  motion,
  className,
  ref,
}: IMaskBox): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  const formVars = {
    opacity: 0,
    y: 34,
  };

  const animate = (gsapWars: gsap.TweenVars): void => {
    if (!refContent.current) return;

    gsap.fromTo(
      refContent.current,
      { ...formVars, ...motion?.from },
      {
        ...gsapWars,
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        duration: 1.6,
        ...motion?.to,
        onStart: () => {
          gsapWars.onStart?.();
          motion?.to?.onStart?.();
        },
      }
    );
  };

  const motionIn = (twVars?: gsap.TweenVars): void => {
    if (!refContent.current) return;

    gsap.killTweensOf(refContent.current);
    gsap.fromTo(
      refContent.current,
      { ...formVars },
      {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        duration: 1.6,
        ...twVars,
      }
    );
  };

  const motionOut = (twVars?: gsap.TweenVars): void => {
    if (!refContent.current) return;

    gsap.killTweensOf(refContent.current);
    gsap.to(refContent.current, {
      opacity: 0,
      y: 34,
      ease: 'power3.out',
      duration: 1.6,
      ...twVars,
    });
  };

  const motionReset = (twVars?: gsap.TweenVars): void => {
    if (!refContent.current) return;

    gsap.killTweensOf(refContent.current);
    gsap.set(refContent.current, { opacity: 0, y: 34, ...twVars });
  };

  useImperativeHandle(ref, () => ({
    motionIn,
    motionOut,
    motionReset,
  }));

  useAnimate({ refContent, motion, animate });
  return (
    <div ref={refContent} className={className}>
      {children}
    </div>
  );
}
