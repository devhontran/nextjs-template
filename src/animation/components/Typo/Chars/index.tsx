'use client';

import cn from 'classnames';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';

import useAnimateTypo from '@/animation/hooks/useAnimateTypo';
import { MotionCharsType } from '@/enum/motion';
import type { IAnimationProps } from '@/types/animation';

import s from './Chars.module.scss';
import { useChars } from './useChars';
import { useCharsMaskLeft } from './useCharsMaskLeft';

interface ParagraphLineMaskProps extends PropsWithChildren {
  motion?: IAnimationProps;
  type?: MotionCharsType;
  className?: string;
  fixClip?: boolean;
}

export default function MotionChars({
  children,
  motion,
  className,
  fixClip,
  type = MotionCharsType.CHARS_MASK,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  const { motionInit, motionIn, textRevert } = useChars({
    refContent,
    isTriggerMotion: true,
    fixClip,
  });

  const {
    motionInit: motionInitLeftMask,
    motionIn: motionInLeftMask,
    textRevert: textRevertLeftMask,
  } = useCharsMaskLeft({
    refContent,
    isTriggerMotion: true,
  });

  useAnimateTypo({
    refContent,
    motion,
    type,
    animates: {
      [MotionCharsType.CHARS_LEFT_MASK]: {
        motionInit: motionInitLeftMask,
        motionIn: motionInLeftMask,
      },
      [MotionCharsType.CHARS_MASK]: {
        motionInit: motionInit,
        motionIn: motionIn,
      },
    },
    reverts: {
      [MotionCharsType.CHARS_LEFT_MASK]: textRevertLeftMask,
      [MotionCharsType.CHARS_MASK]: textRevert,
    },
  });

  return (
    <div ref={refContent} className={cn(s.chars, className)}>
      {children}
    </div>
  );
}
