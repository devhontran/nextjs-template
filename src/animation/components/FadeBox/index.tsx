'use client';

import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { PropsWithChildren, ReactElement } from 'react';
import { useImperativeHandle, useRef } from 'react';

import useAnimate from '@/animation/hooks/useAnimate';

interface IMaskBox extends PropsWithChildren {
  motion?: IAnimationProps;
  className?: string;
  ref?: React.RefObject<IRefMotion | null>;
  isOnce?: boolean;
  isIgnoreTrigger?: boolean;
}

export default function MotionFadeBox({
  children,
  motion,
  className,
  ref,
  isOnce = false,
  isIgnoreTrigger = false,
}: IMaskBox): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  const formVars = {
    opacity: 0,
    y: 34,
  };

  const { contextSafe } = useGSAP();

  const animate = contextSafe((gsapWars: gsap.TweenVars): void => {
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
  });

  const motionIn = contextSafe((twVars?: gsap.TweenVars): void => {
    if (!refContent.current) return;

    gsap.killTweensOf(refContent.current);
    gsap.fromTo(
      refContent.current,
      { ...formVars },
      {
        opacity: 1,
        onStart: () => {
          gsap.set(refContent.current, { visibility: 'visible' });
        },
        y: 0,
        ease: 'power3.out',
        duration: 1.6,
        ...twVars,
      }
    );
  });

  const motionOut = contextSafe((twVars?: gsap.TweenVars): void => {
    if (!refContent.current) return;

    gsap.killTweensOf(refContent.current);
    gsap.to(refContent.current, {
      opacity: 0,
      y: 34,
      ease: 'power3.out',
      duration: 1.6,
      ...twVars,
    });
  });

  const motionReset = contextSafe((twVars?: gsap.TweenVars): void => {
    if (!refContent.current) return;

    gsap.killTweensOf(refContent.current);
    gsap.set(refContent.current, { opacity: 0, y: 34, ...twVars });
  });

  useImperativeHandle(ref, () => ({
    motionIn,
    motionOut,
    motionReset,
  }));

  useAnimate({ refContent, motion, animate, isOnce, isIgnoreTrigger });
  return (
    <Box willChange={'transform, opacity'} ref={refContent} className={className}>
      {children}
    </Box>
  );
}
