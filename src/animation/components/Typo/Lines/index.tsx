'use client';

import cn from 'classnames';
import gsap from 'gsap';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';
import type SplitType from 'split-type';

import useAnimateTypo from '@/animation/hooks/useAnimateTypo';
import type { MotionCharsTarget } from '@/enum/motion';
import { MotionLinesType } from '@/enum/motion';
import type { IAnimationProps } from '@/types/animation';

import s from './Lines.module.scss';

interface ParagraphLineMaskProps extends PropsWithChildren {
  motion?: IAnimationProps;
  type?: MotionLinesType;
  className?: string;
  target?: MotionCharsTarget;
}

export default function MotionLines({
  children,
  motion,
  type,
  className,
  target,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  const animate = (gsapWars: gsap.TweenVars, textSplitTypes: SplitType | null): void => {
    if (!refContent.current) return;

    let toTweenVars: gsap.TweenVars = {};
    let fromTweenVars: gsap.TweenVars = {};
    switch (type) {
      case MotionLinesType.fade:
        refContent.current.classList.add(s.lineFade);
        fromTweenVars = { yPercent: 100, opacity: 0 };
        toTweenVars = { yPercent: 0, opacity: 1 };
        break;

      case MotionLinesType.mask:
      default:
        toTweenVars = { yPercent: 0 };
        refContent.current.classList.add(s.lineMask);
        if (textSplitTypes?.lines?.length) {
          textSplitTypes.lines.forEach((line) => {
            const parent = line.parentElement;
            if (parent) {
              const div = document.createElement('div');
              div.appendChild(line);
              div.classList.add('line__mask');
              parent.appendChild(div);
            }
          });
        }
        fromTweenVars = { yPercent: 100 };
        break;
    }

    if (textSplitTypes?.lines) {
      gsap.fromTo(textSplitTypes.lines, fromTweenVars, {
        ...toTweenVars,
        ...gsapWars,
        ...motion?.to,
      });
    }
  };

  useAnimateTypo({
    refContent,
    types: ['lines'],
    motion,
    animate,
    target,
  });

  return (
    <div ref={refContent} className={cn(s.lines, className)}>
      {children}
    </div>
  );
}
