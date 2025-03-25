'use client';

import gsap from 'gsap';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';

import useAnimate from '@/animation/hooks/useAnimate';
import { MotionMaskBoxType } from '@/enum/motion';
import type { IAnimationProps } from '@/types/animation';

interface IMaskBox extends PropsWithChildren {
  motion?: IAnimationProps;
  direction?: MotionMaskBoxType;
}

export default function MotionMaskBox({ children, motion, direction }: IMaskBox): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  const animate = (gsapWars: gsap.TweenVars): void => {
    let clipPathTo = 'inset(100%)';
    let clipPathForm = 'inset(0%)';

    switch (direction) {
      case MotionMaskBoxType.BOTTOM:
        clipPathTo = 'inset(0% 0% 0% 0%)';
        clipPathForm = 'inset(100% 0% 0% 0%)';
        break;
      case MotionMaskBoxType.BOTTOM_CENTER:
        clipPathTo = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
        clipPathForm = 'polygon(50% 100%, 50% 100%, 50% 100%, 50% 100%)';
        break;
      default:
        clipPathTo = 'inset(0%)';
        clipPathForm = 'inset(100% 0% 0% 0%)';
    }

    gsap.fromTo(
      refContent.current,
      { clipPath: clipPathForm, ...motion?.from },
      {
        ...gsapWars,
        clipPath: clipPathTo,
        ease: 'power3.inOut',
        duration: 1.2,
        ...motion?.to,
      }
    );
  };

  useAnimate({ refContent, motion, animate });
  return <div ref={refContent}>{children}</div>;
}
