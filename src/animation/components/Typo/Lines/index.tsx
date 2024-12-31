'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';
import SplitType from 'split-type';

import useAnimateTypo from '@/animation/hooks/useAnimateTypo';
import { IAnimationProps } from '@/types/animation';

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
  const refContent = useRef<IAnimationElement | null>(null);

  const { contextSafe } = useGSAP();
  const animate = contextSafe((gsapWars: gsap.TweenVars, textSplitTypes: SplitType | null) => {
    let toTweenVars: gsap.TweenVars = {};
    let fromTweenVars: gsap.TweenVars = {};
    switch (type) {
      case MotionLinesType.fade:
        refContent.current?.classList.add(s.lineFade);
        fromTweenVars = { yPercent: 100, opacity: 0 };
        toTweenVars = { yPercent: 0, opacity: 1 };
        break;

      case MotionLinesType.mask:
      default:
        toTweenVars = { yPercent: 0 };
        refContent.current?.classList.add(s.lineMask);
        textSplitTypes?.lines?.length &&
          textSplitTypes.lines.forEach((line) => {
            const div = document.createElement('div');
            div.appendChild(line);
            div.classList.add('line__mask');
            refContent.current?.appendChild(div);
          });
        toTweenVars = { yPercent: 100 };
        break;
    }

    textSplitTypes?.chars &&
      gsap.fromTo(textSplitTypes.chars, fromTweenVars, {
        ...toTweenVars,
        ...gsapWars,
        ...motion?.to,
      });
  });

  useAnimateTypo({
    refContent,
    types: ['lines'],
    motion,
    animate,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
