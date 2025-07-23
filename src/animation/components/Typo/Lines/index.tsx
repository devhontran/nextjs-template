'use client';

import { Box } from '@chakra-ui/react';
import cn from 'classnames';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';

import useAnimateTypo from '@/animation/hooks/useAnimateTypo';
import { MotionLinesType } from '@/enum/motion';

import { useLines3D } from './useLines3D';
import { useLinesFade } from './useLinesFade';
import { useLinesMask } from './useLinesMask';

interface ParagraphLineMaskProps extends PropsWithChildren {
  motion?: IAnimationProps;
  type?: MotionLinesType;
  className?: string;
  fixClip?: boolean;
  isBlock?: boolean;
  isSkipRevert?: boolean;
}

export default function MotionLines({
  children,
  motion,
  type = MotionLinesType.LINES_MASK,
  className,
  fixClip,
  isBlock,
  isSkipRevert,
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
    reverts: isSkipRevert
      ? {}
      : {
          [MotionLinesType.LINES_THREE_D]: textRevert3D,
          [MotionLinesType.LINES_MASK]: textRevertMask,
          [MotionLinesType.LINES_FADE]: textRevertFade,
        },
  });

  return (
    <Box as="span" display="block" ref={refContent} className={cn(className)}>
      {children}
    </Box>
  );
}
