'use client';

import { IPropMotionInit, IPropMotionPlay } from '@Motions/Typo/motionType';
import s from '@Motions/Typo/styles.module.scss';
import useAnimationTypo from '@Motions/Typo/useAnimationTypo';
import gsap from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';

interface ParagraphLineMaskProps extends PropsWithChildren {
  motion?: IAnimationProps;
}

type typeRef = HTMLDivElement | HTMLSpanElement | HTMLHeadingElement;

export default function MotionWords({ children, motion }: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<typeRef>(null);
  const regGsap = useRef<gsap.core.Tween>();

  const motionInit = ({ splitText }: IPropMotionInit): void => {
    refContent.current?.classList.add(s.words);
    splitText.words?.length && gsap.set(splitText.words, { yPercent: 100 });
  };

  const motionPlay = ({ splitText, tweenVars }: IPropMotionPlay): void => {
    regGsap.current = gsap.to(splitText.words, {
      ...tweenVars,
      yPercent: 0,
      ease: 'power3.out',
      duration: 0.8,
      stagger: 0.1,
    });
  };

  const motionRevert = (): void => {
    regGsap.current?.revert();
  };

  useAnimationTypo({
    types: ['lines', 'words'],
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
