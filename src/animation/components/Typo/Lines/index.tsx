'use client';

import gsap from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IPropMotionInit, IPropMotionPlay } from '@/animation/components/Typo/motionType';
import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

import useAnimationTypo from '../useAnimationTypo';
import s from './styles.module.scss';

export enum MotionLinesType {
  mask = 'mask',
  fade = 'fade',
}

interface ParagraphLineMaskProps extends PropsWithChildren {
  motion?: IAnimationProps;
  type?: MotionLinesType;
}

export default function MotionLines({
  children,
  motion,
  type,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<IAnimationElement>(null);
  const regGsap = useRef<gsap.core.Tween>();

  const motionInit = ({ splitText }: IPropMotionInit): void => {
    let tweenVars: gsap.TweenVars = {};

    switch (type) {
      case MotionLinesType.fade:
        refContent.current?.classList.add(s.lineFade);
        tweenVars = { yPercent: 100, opacity: 0 };
        break;
      case MotionLinesType.mask:
      default:
        refContent.current?.classList.add(s.lineMask);
        splitText?.lines?.length &&
          splitText.lines.forEach((line) => {
            const div = document.createElement('div');
            div.appendChild(line);
            div.classList.add('line__mask');
            refContent.current?.appendChild(div);
          });
        tweenVars = { yPercent: 100 };
    }

    splitText.lines?.length && gsap.set(splitText.lines, tweenVars);
  };

  const motionPlay = ({ splitText, tweenVars }: IPropMotionPlay): void => {
    let twVars: gsap.TweenVars = {};
    switch (type) {
      case MotionLinesType.fade:
        twVars = { yPercent: 0, opacity: 1 };
        break;
      case MotionLinesType.mask:
      default:
        twVars = { yPercent: 0 };
    }

    regGsap.current = gsap.to(splitText.lines, {
      ...tweenVars,
      ease: 'power3.out',
      duration: 1.2,
      stagger: 0.1,
      ...twVars,
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
