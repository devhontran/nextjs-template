'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { PropsWithChildren, ReactElement } from 'react';
import { cloneElement, isValidElement, useRef } from 'react';
import type SplitType from 'split-type';

import useAnimateTypo from '@/animation/hooks/useAnimateTypo';
import type { IAnimationProps } from '@/types/animation';

import s from './styles.module.scss';
export enum MotionCharsType {
  mask = 'mask',
  mask_top = 'mask_top',
  mask_random = 'mask_random',
  solidBox = 'solidBox',
  scale = 'scale',
  typing = 'typing',
}

interface ParagraphLineMaskProps extends PropsWithChildren {
  motion?: IAnimationProps;
  type?: MotionCharsType;
}

export default function MotionChars({
  children,
  motion,
  type,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<HTMLDivElement | null>(null);

  const { contextSafe } = useGSAP();
  const animate = contextSafe((gsapWars: gsap.TweenVars, textSplitTypes: SplitType | null) => {
    let fromTweenVars: gsap.TweenVars = {};
    let toTweenVars: gsap.TweenVars = {};
    refContent.current?.classList.add(s.chars);

    switch (type) {
      case MotionCharsType.solidBox:
        break;

      case MotionCharsType.scale:
        fromTweenVars = { scale: 0 };
        toTweenVars = { scale: 1 };
        break;

      case MotionCharsType.typing:
        fromTweenVars = { opacity: 0 };
        toTweenVars = { opacity: 1 };
        break;

      case MotionCharsType.mask_random:
        textSplitTypes?.chars?.length &&
          textSplitTypes.chars.forEach((char) => {
            gsap.set(char, { yPercent: Math.random() < 0.5 ? -100 : 100 });
          });
        toTweenVars = { yPercent: 0 };
        break;

      case MotionCharsType.mask_top:
        fromTweenVars = { yPercent: -100 };
        toTweenVars = { yPercent: 0 };
        break;

      default:
        fromTweenVars = { yPercent: 100 };
        toTweenVars = { yPercent: 0 };
        break;
    }

    textSplitTypes?.chars &&
      gsap.fromTo(textSplitTypes.chars, fromTweenVars, {
        ...toTweenVars,
        ...gsapWars,
        ease: 'power3.out',
        duration: 0.8,
        stagger: 0.015,
        ...motion?.to,
      });
  });

  useAnimateTypo({
    types: ['lines', 'words', 'chars'],
    refContent,
    motion,
    animate,
  });

  if (!isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return cloneElement(children, { ...{ ref: refContent } });
}
