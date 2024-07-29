'use client';

import { IPropMotionInit, IPropMotionPlay } from '@Motions/Typo/motionType';
import s from '@Motions/Typo/styles.module.scss';
import useAnimationTypo from '@Motions/Typo/useAnimationTypo';
import gsap from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface ParagraphLineMaskProps extends PropsWithChildren {
  motion?: IAnimationProps;
}

export default function MotionLineFade({ children, motion }: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<IAnimationElement | null>(null);
  const regGsap = useRef<gsap.core.Tween>();

  const motionInit = ({ splitText }: IPropMotionInit): void => {
    refContent.current?.classList.add(s.lineFade);
    splitText.lines?.length && gsap.set(splitText.lines, { yPercent: 100, opacity: 0 });
  };

  const motionPlay = ({ splitText, tweenVars }: IPropMotionPlay): void => {
    regGsap.current = gsap.to(splitText.lines, {
      ...tweenVars,
      yPercent: 0,
      opacity: 1,
      ease: 'power3.out',
      duration: 1.2,
      stagger: 0.1,
    });
  };

  const motionRevert = (): void => {
    regGsap.current?.revert();
  };

  useAnimationTypo({
    types: ['lines'],
    refContent,
    motionPlay,
    motionInit,
    motionRevert,
    motion,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
