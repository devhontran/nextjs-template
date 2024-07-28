'use client';

import { useGSAP } from '@gsap/react';
import useMotion from '@Motions/useMotion';
import gsap from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';

interface IMaskBox extends PropsWithChildren {
  motion?: IAnimationProps;
}

export default function MotionMaskBox({ children, motion }: IMaskBox): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const refGsap = useRef<gsap.core.Tween | null>(null);

  const { contextSafe } = useGSAP(() => {
    refContent.current && gsap.set(refContent.current, { clipPath: 'inset(100%)' });
  });

  const motionPlay = contextSafe((tweenVars: gsap.TweenVars): void => {
    if (!refContent.current) return;
    refGsap.current = gsap.to(refContent.current, {
      ...tweenVars,
      clipPath: 'inset(0%)',
      ease: 'power3.inOut',
      duration: 1,
    });
  });

  const motionRevert = (): void => {
    refGsap.current?.revert();
  };

  useMotion({
    refContent,
    motion,
    motionPlay,
    motionRevert,
  });
  return <div ref={refContent}>{children}</div>;
}
