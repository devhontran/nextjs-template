'use client';

import { IPropMotionInit, IPropMotionPlay } from '@Motions/Typo/motionType';
import gsap from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';

import s from '../styles.module.scss';
import useAnimationTypo from '../useAnimationTypo';

interface ParagraphLineMaskProps extends PropsWithChildren {
  motion?: IAnimationProps;
}

type typeRef = HTMLDivElement | HTMLSpanElement | HTMLHeadingElement | HTMLParagraphElement;

export default function MotionLineMask({ children, motion }: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<typeRef>(null);
  const regGsap = useRef<gsap.core.Tween>();

  const motionInit = ({ splitText }: IPropMotionInit): void => {
    refContent.current?.classList.add(s.lineMask);
    splitText?.lines?.length &&
      splitText.lines.forEach((line) => {
        const div = document.createElement('div');
        div.appendChild(line);
        div.classList.add('line__mask');
        refContent.current?.appendChild(div);
      });

    splitText.lines?.length && gsap.set(splitText.lines, { yPercent: 100 });
  };

  const motionPlay = ({ splitText, tweenVars }: IPropMotionPlay): void => {
    console.log('____MotionLineMask', splitText.lines);
    regGsap.current = gsap.to(splitText.lines, {
      ...tweenVars,
      yPercent: 0,
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
