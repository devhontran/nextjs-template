'use client';

import cn from 'classnames';
import gsap from 'gsap';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';
import type SplitType from 'split-type';

import useAnimateTypo from '@/animation/hooks/useAnimateTypo';
import type { MotionCharsTarget } from '@/enum/motion';
import { MotionCharsType } from '@/enum/motion';
import type { IAnimationProps } from '@/types/animation';

import s from './Chars.module.scss';

interface ParagraphLineMaskProps extends PropsWithChildren {
  motion?: IAnimationProps;
  type?: MotionCharsType;
  className?: string;
  target?: MotionCharsTarget;
}

export default function MotionChars({
  children,
  motion,
  type,
  className,
  target,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  const animate = (gsapWars: gsap.TweenVars, textSplitTypes: SplitType | null): void => {
    if (!refContent.current) return;

    let fromTweenVars: gsap.TweenVars = {};
    let toTweenVars: gsap.TweenVars = {};

    switch (type) {
      case MotionCharsType.SOLID_BOX:
        break;

      case MotionCharsType.SCALE:
        fromTweenVars = { scale: 0 };
        toTweenVars = { scale: 1 };
        break;

      case MotionCharsType.TYPING:
        fromTweenVars = { opacity: 0 };
        toTweenVars = { opacity: 1 };
        break;

      case MotionCharsType.MASK_RANDOM:
        if (textSplitTypes?.chars?.length) {
          textSplitTypes.chars.forEach((char) => {
            gsap.set(char, { yPercent: Math.random() < 0.5 ? -100 : 100 });
          });
        }
        toTweenVars = { yPercent: 0 };
        break;

      case MotionCharsType.MASK_TOP:
        fromTweenVars = { yPercent: -100 };
        toTweenVars = { yPercent: 0 };
        break;

      default:
        fromTweenVars = { yPercent: 100 };
        toTweenVars = { yPercent: 0 };
        break;
    }

    if (textSplitTypes?.chars) {
      gsap.fromTo(textSplitTypes.chars, fromTweenVars, {
        ...toTweenVars,
        ...gsapWars,
        ease: 'power3.out',
        duration: 0.8,
        stagger: 0.015,
        ...motion?.to,
      });
    }
  };

  useAnimateTypo({
    types: ['lines', 'words', 'chars'],
    refContent,
    motion,
    animate,
    target,
  });
  return (
    <div ref={refContent} className={cn(s.chars, className)}>
      {children}
    </div>
  );
}
