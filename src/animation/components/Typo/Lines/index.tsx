'use client';

import cn from 'classnames';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';

import useAnimateTypo from '@/animation/hooks/useAnimateTypo';
import { MotionLinesType } from '@/enum/motion';
import type { IAnimationProps } from '@/types/animation';

import { useLines3D } from './useLines3D';
import { useLinesFade } from './useLinesFade';
import { useLinesMask } from './useLinesMask';

interface ParagraphLineMaskProps extends PropsWithChildren {
  motion?: IAnimationProps;
  type?: MotionLinesType;
  className?: string;
  fixClip?: boolean;
  isBlock?: boolean;
}

export default function MotionLines({
  children,
  motion,
  type = MotionLinesType.LINES_MASK,
  className,
  fixClip,
  isBlock,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  const {
    motionInit,
    motionIn,
    textRevert: textRevertFade,
  } = useLinesFade({
    isTriggerMotion: true,
    refContent,
    isBlock,
  });

  const {
    motionInit: motionInit3D,
    motionIn: motionIn3D,
    textRevert: textRevert3D,
  } = useLines3D({
    isTriggerMotion: true,
    refContent,
    fixClip,
    isBlock,
  });

  const {
    motionInit: motionInitMask,
    motionIn: motionInMask,
    textRevert: textRevertMask,
  } = useLinesMask({
    isTriggerMotion: true,
    refContent,
    fixClip,
    isBlock,
  });

  useAnimateTypo({
    refContent,
    motion,
    type,
    animates: {
      [MotionLinesType.LINES_THREE_D]: {
        motionInit: motionInit3D,
        motionIn: motionIn3D,
      },
      [MotionLinesType.LINES_MASK]: {
        motionInit: motionInitMask,
        motionIn: motionInMask,
      },
      [MotionLinesType.LINES_FADE]: {
        motionInit: motionInit,
        motionIn: motionIn,
      },
    },
    reverts: {
      [MotionLinesType.LINES_THREE_D]: textRevert3D,
      [MotionLinesType.LINES_MASK]: textRevertMask,
      [MotionLinesType.LINES_FADE]: textRevertFade,
    },
  });

  return (
    <div ref={refContent} className={cn(className)}>
      {children}
    </div>
  );
}
