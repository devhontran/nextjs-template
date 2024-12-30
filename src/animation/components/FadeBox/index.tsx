'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import useAnimate from '@/animation/hooks/useAnimate';
import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface IMaskBox extends PropsWithChildren {
  motion?: IAnimationProps;
}

export default function MotionFadeBox({ children, motion }: IMaskBox): ReactElement {
  const refContent = useRef<IAnimationElement>(null);
  const refGsap = useRef<gsap.core.Tween | null>(null);
  const { tweenVars } = useAnimate({ refContent, motion });
  useGSAP(() => {
    refGsap.current = gsap.fromTo(
      refContent.current,
      { opacity: 0, y: 34, ...motion?.from },
      {
        ...tweenVars,
        opacity: 1,
        y: 0,
        ease: 'power3.inOut',
        duration: 1,
        ...motion?.to,
      }
    );
  }, [tweenVars]);

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
