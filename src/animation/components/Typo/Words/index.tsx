'use client';

import cn from 'classnames';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';

import useAnimateTypo from '@/animation/hooks/useAnimateTypo';
import { MotionWordsType } from '@/enum/motion';

import { useWords3D } from './useWords3D';
import s from './Words.module.scss';

interface ParagraphLineMaskProps extends PropsWithChildren {
  motion?: IAnimationProps;
  className?: string;
  fixClip?: boolean;
  isBlock?: boolean;
}

export default function MotionWords({
  children,
  motion,
  className,
  fixClip,
  isBlock,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  const {
    motionInit,
    motionIn,
    textRevert: textRevert3D,
  } = useWords3D({
    isTriggerMotion: true,
    refContent,
    fixClip,
    isBlock,
  });

  useAnimateTypo({
    refContent,
    motion,
    type: MotionWordsType.WORDS_3D,
    animates: {
      [MotionWordsType.WORDS_3D]: {
        motionInit,
        motionIn,
      },
    },
    reverts: {
      [MotionWordsType.WORDS_3D]: textRevert3D,
    },
  });
  return (
    <div ref={refContent} className={cn(s.words, className)}>
      {children}
    </div>
  );
}
