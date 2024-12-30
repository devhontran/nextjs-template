'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { PropsWithChildren, ReactElement, useRef } from 'react';

import useAnimate from '@/animation/hooks/useAnimate';
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
  const { tweenVars } = useAnimate({ refContent, motion });

  useGSAP(() => {
    let clipPathTo = 'inset(100%)';
    let clipPathForm = 'inset(0%)';

    switch (direction) {
      case MaskBoxType.BOTTOM:
        clipPathTo = 'inset(0% 0% 0% 0%)';
        clipPathForm = 'inset(100% 0% 0% 0%)';
        break;
      case MaskBoxType.BOTTOM_CENTER:
        clipPathTo = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
        clipPathForm = 'polygon(50% 100%, 50% 100%, 50% 100%, 50% 100%)';
        break;
      default:
        clipPathTo = 'inset(0%)';
        clipPathForm = 'inset(100% 0% 0% 0%)';
    }

    refGsap.current = gsap.fromTo(
      refContent.current,
      { clipPath: clipPathForm, ...motion?.from },
      {
        ...tweenVars,
        clipPath: clipPathTo,
        ease: 'power3.inOut',
        duration: 1.2,
        onComplete: function () {
          gsap.set(this.targets(), { clearProps: 'all' });
        },
        ...motion?.to,
      }
    );
  }, [tweenVars]);

  return <div ref={refContent}>{children}</div>;
}
