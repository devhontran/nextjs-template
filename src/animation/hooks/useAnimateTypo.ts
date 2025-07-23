'use client';

import { useRef } from 'react';

import type { MotionCharsType, MotionLinesType, MotionWordsType } from '@/enum/motion';
import type { IAnimationProps } from '@/types/animation';

import useAnimate from './useAnimate';

type ITypeInput = MotionCharsType | MotionLinesType | MotionWordsType;

interface IMotionProps {
  refContent: React.RefObject<IAnimationElement>;
  motion?: IAnimationProps;
  type: Partial<ITypeInput>;
  animates: Partial<Record<ITypeInput, IMotionTypoFunctions>>;
  reverts: Partial<Record<ITypeInput, (() => void) | undefined>>;
}

export default function useAnimateTypo({
  refContent,
  motion,
  type,
  animates,
  reverts,
}: IMotionProps): void {
  const refTween = useRef<{
    init: gsap.core.Tween | null;
    in: gsap.core.Tween | null;
  }>({
    init: null,
    in: null,
  });

  const animate = async (twVars?: gsap.TweenVars): Promise<void> => {
    refTween.current.init = (await animates[type]?.motionInit()) ?? null;
    refTween.current.in = animates[type]?.motionIn(twVars) ?? null;
  };

  const revert = (): void => {
    reverts[type]?.();
  };

  const kill = (): void => {
    if (!reverts[type]) {
      return;
    }

    refTween.current.in?.kill();
    refTween.current.in?.revert();
    revert();
  };

  useAnimate({
    refContent,
    animate,
    motion,
    kill,
  });
}
