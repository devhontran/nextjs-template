'use client';

import gsap from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IPropMotionInit, IPropMotionPlay } from '@/animation/components/Typo/motionType';
import useAnimationTypo from '@/animation/components/Typo/useAnimationTypo';
import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

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
  const refContent = useRef<IAnimationElement | null>(null);
  const regGsap = useRef<gsap.core.Tween>();

  const motionInit = ({ splitText }: IPropMotionInit): void => {
    refContent.current?.classList.add(s.chars);
    let tweenVars: gsap.TweenVars = {};
    switch (type) {
      case MotionCharsType.solidBox:
        break;
      case MotionCharsType.scale:
        tweenVars = { scale: 0 };
        break;
      case MotionCharsType.typing:
        tweenVars = { opacity: 0 };
        break;
      case MotionCharsType.mask_random:
        splitText.chars?.length &&
          splitText.chars?.forEach((char) => {
            gsap.set(char, { yPercent: Math.random() < 0.5 ? -100 : 100 });
          });
        break;

      case MotionCharsType.mask_top:
        tweenVars = { yPercent: -100 };
        break;
      default:
        tweenVars = { yPercent: 100 };
    }

    if (type !== MotionCharsType.mask_random) {
      splitText.chars?.length && gsap.set(splitText.chars, tweenVars);
    }
  };

  const motionPlay = ({ splitText, tweenVars }: IPropMotionPlay): void => {
    let tweenVarsMotion: gsap.TweenVars = {};
    switch (type) {
      case MotionCharsType.solidBox:
        break;
      case MotionCharsType.scale:
        tweenVarsMotion = { scale: 1 };
        break;
      case MotionCharsType.typing:
        tweenVarsMotion = { opacity: 1, duration: 0.15, stagger: 0.1 };
        break;

      case MotionCharsType.mask_top:
      case MotionCharsType.mask_random:
      default:
        tweenVarsMotion = { yPercent: 0 };
    }
    regGsap.current = gsap.to(splitText.chars, {
      ...tweenVars,
      ease: 'power3.out',
      duration: 0.8,
      stagger: 0.015,
      ...tweenVarsMotion,
    });
  };

  const motionRevert = (): void => {
    regGsap.current?.revert();
  };

  useAnimationTypo({
    types: ['lines', 'words', 'chars'],
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
