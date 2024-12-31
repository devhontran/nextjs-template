'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';
import SplitType from 'split-type';

import useAnimateTypo from '@/animation/hooks/useAnimateTypo';
import { IAnimationProps } from '@/types/animation';

import s from './styles.module.scss';

export enum MotionWordsType {
  mask = 'mask',
  fade_slide_left = 'fade_slide_left',
}

interface ParagraphLineMaskProps extends PropsWithChildren {
  motion?: IAnimationProps;
  type?: MotionWordsType;
}

export default function MotionChars({
  children,
  motion,
  type,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<IAnimationElement | null>(null);

  const { contextSafe } = useGSAP();

  const animate = contextSafe((gsapWars: gsap.TweenVars, textSplitTypes: SplitType | null) => {
    let fromTweenVars: gsap.TweenVars = {};
    let toTweenVars: gsap.TweenVars = {};
    refContent.current?.classList.add(s.words);

    switch (type) {
      case MotionWordsType.fade_slide_left:
        fromTweenVars = { xPercent: 100, opacity: 0 };
        toTweenVars = {
          xPercent: 0,
          opacity: 1,
          stagger: 0.015,
          duration: 1,
          ease: 'power3.inOut',
        };
        break;
      case MotionWordsType.mask:
      default:
        fromTweenVars = { yPercent: 100 };
        toTweenVars = { yPercent: 0, stagger: 0.015, duration: 0.8, ease: 'power3.out' };
    }

    textSplitTypes?.words &&
      gsap.fromTo(textSplitTypes.words, fromTweenVars, {
        ...toTweenVars,
        ...gsapWars,
        ...motion?.to,
      });
  });

  useAnimateTypo({
    refContent,
    types: ['words'],
    motion,
    animate,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
