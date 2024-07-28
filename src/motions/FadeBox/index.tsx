'use client';

import { useGSAP } from '@gsap/react';
import useMotion from '@Motions/useMotion';
import gsap from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

import s from './styles.module.scss';

interface IMaskBox extends PropsWithChildren {
  motion?: IAnimationProps;
}

export default function MotionFadeBox({ children, motion }: IMaskBox): ReactElement {
  const refContent = useRef<IAnimationElement>(null);
  const refGsap = useRef<gsap.core.Tween | null>(null);

  const { contextSafe } = useGSAP();

  const motionInit = contextSafe(() => {
    refContent.current?.classList.add(s.motionFade);
    refContent.current && gsap.set(refContent.current, { opacity: 0, y: 34 });
  });
  const motionPlay = contextSafe((tweenVars: gsap.TweenVars): void => {
    refGsap.current = gsap.to(refContent.current, {
      ...tweenVars,
      opacity: 1,
      y: 0,
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
    motionInit,
  });
  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
