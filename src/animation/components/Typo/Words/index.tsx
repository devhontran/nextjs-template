'use client';

import cn from 'classnames';
import gsap from 'gsap';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';
import type SplitType from 'split-type';

import useAnimateTypo from '@/animation/hooks/useAnimateTypo';
import type { IAnimationProps } from '@/types/animation';

import s from './styles.module.scss';

export enum MotionWordsType {
  mask = 'mask',
  fade_slide_left = 'fade_slide_left',
}

interface ParagraphLineMaskProps extends PropsWithChildren {
  motion?: IAnimationProps;
  type?: MotionWordsType;
  className?: string;
}

export default function MotionChars({
  children,
  motion,
  type,
  className,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  const animate = (gsapWars: gsap.TweenVars, textSplitTypes: SplitType | null): void => {
    if (!refContent.current) return;

    let fromTweenVars: gsap.TweenVars = {};
    let toTweenVars: gsap.TweenVars = {};
    refContent.current.classList.add(s.words);

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

    if (textSplitTypes?.words) {
      gsap.fromTo(textSplitTypes.words, fromTweenVars, {
        ...toTweenVars,
        ...gsapWars,
        ...motion?.to,
      });
    }
  };
  useAnimateTypo({
    refContent,
    types: ['words'],
    motion,
    animate,
  });

  return (
    <div ref={refContent} className={cn(s.words, className)}>
      {children}
    </div>
  );
}
