'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import useAnimationTypo from '@/animation/components/Typo/useAnimationTypo';
import { IAnimationProps } from '@/types/animation';

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
  const refContent = useRef<IAnimationElement | null>(null);
  const { gsapWars, textSplitTypes } = useAnimationTypo({
    types: ['lines', 'words', 'chars'],
    refContent,
    motion,
  });

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    let fromTweenVars: gsap.TweenVars = {};
    let toTweenVars: gsap.TweenVars = {};

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
          textSplitTypes.chars?.forEach((char) => {
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
      gsap.fromTo(textSplitTypes?.chars, fromTweenVars, {
        ...toTweenVars,
        ...gsapWars,
        ease: 'power3.out',
        duration: 0.8,
        stagger: 0.015,
        delay: 2.5,
        ...motion?.to,
      });
  }, [gsapWars, textSplitTypes]);

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
