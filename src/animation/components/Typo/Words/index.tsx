'use client';

import gsap from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IPropMotionInit, IPropMotionPlay } from '@/animation/components/Typo/motionType';
import useAnimationTypo from '@/animation/components/Typo/useAnimationTypo';
import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

import s from './styles.module.scss';

export enum MotionWordsType {
  mask = 'mask',
  fade_slide_left = 'fade_slide_left',
}

interface ParagraphLineMaskProps extends PropsWithChildren {
  motion?: IAnimationProps;
  type?: MotionWordsType;
}

export default function MotionWords({
  children,
  motion,
  type,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<IAnimationElement | null>(null);
  const regGsap = useRef<gsap.core.Tween>();

  const motionInit = ({ splitText }: IPropMotionInit): void => {
    refContent.current?.classList.add(s.words);

    let twVars: gsap.TweenVars;
    switch (type) {
      case MotionWordsType.fade_slide_left:
        twVars = { xPercent: 100, opacity: 0 };
        break;
      case MotionWordsType.mask:
      default:
        twVars = { yPercent: 100 };
    }

    splitText.words?.length && gsap.set(splitText.words, twVars);
  };

  const motionPlay = ({ splitText, tweenVars }: IPropMotionPlay): void => {
    let twVars: gsap.TweenVars;
    switch (type) {
      case MotionWordsType.fade_slide_left:
        twVars = { xPercent: 0, opacity: 1, stagger: 0.015, duration: 1, ease: 'power3.inOut' };
        break;
      case MotionWordsType.mask:
      default:
        twVars = { yPercent: 0 };
    }

    regGsap.current = gsap.to(splitText.words, {
      ...tweenVars,
      ease: 'power3.out',
      duration: 0.8,
      stagger: 0.1,
      ...twVars,
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
