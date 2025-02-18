'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { PropsWithChildren, ReactElement } from 'react';
import { cloneElement, isValidElement, useRef } from 'react';

import useAnimate from '@/animation/hooks/useAnimate';
import type { IAnimationProps } from '@/types/animation';

interface IMaskBox extends PropsWithChildren {
  motion?: IAnimationProps;
}

export default function MotionFadeBox({ children, motion }: IMaskBox): ReactElement {
  const refContent = useRef<IAnimationElement>(null);

  const { contextSafe } = useGSAP();
  const animate = contextSafe((gsapWars: gsap.TweenVars) => {
    const el = refContent.current;
    if (!el) return;

    gsap.fromTo(
      el,
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
  });

  useAnimate({ refContent, motion, animate });
  if (!isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  // Consider alternatives to cloneElement if possible
  return cloneElement(children, { ...{ ref: refContent } });
}
