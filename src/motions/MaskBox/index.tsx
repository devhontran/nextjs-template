'use client';

import { useGSAP } from '@gsap/react';
import useMotion from '@Motions/useMotion';
import gsap from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';

export enum MaskBoxType {
  BOTTOM = 'BOTTOM',
  BOTTOM_CENTER = 'BOTTOM_CENTER',
}

interface IMaskBox extends PropsWithChildren {
  motion?: IAnimationProps;
  direction?: MaskBoxType;
}

export default function MotionMaskBox({ children, motion, direction }: IMaskBox): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const refGsap = useRef<gsap.core.Tween | null>(null);

  const { contextSafe } = useGSAP(() => {
    let clipPath = 'inset(100%)';
    switch (direction) {
      case MaskBoxType.BOTTOM:
        clipPath = 'inset(100% 0% 0% 0%)';
        break;
      case MaskBoxType.BOTTOM_CENTER:
        clipPath = 'polygon(50% 100%, 50% 100%, 50% 100%, 50% 100%)';
        break;
      default:
        clipPath = 'inset(100%)';
    }

    refContent.current && gsap.set(refContent.current, { clipPath });
  });

  const motionPlay = contextSafe((tweenVars: gsap.TweenVars): void => {
    if (!refContent.current) return;

    let clipPath = 'inset(100%)';
    switch (direction) {
      case MaskBoxType.BOTTOM:
        clipPath = 'inset(0% 0% 0% 0%)';
        break;
      case MaskBoxType.BOTTOM_CENTER:
        clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
        break;
      default:
        clipPath = 'inset(0%)';
    }

    refGsap.current = gsap.to(refContent.current, {
      ...tweenVars,
      clipPath,
      ease: 'power3.inOut',
      duration: 1.2,
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
