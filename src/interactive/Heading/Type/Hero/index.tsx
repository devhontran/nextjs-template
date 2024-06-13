'use client';

import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import useAnimation from '@/hooks/useAnimation';
import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

import useHeadingChar from './useCharHero';

interface ParagraphLineMaskProps extends PropsWithChildren, IAnimationProps {}

export default function HeadingHero({
  children,
  delayEnter,
  delayTrigger,
  isObserver,
  threshold,
  start,
  horizontal,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<IAnimationElement>(null);

  const { initAnimation, playAnimation } = useHeadingChar({
    refContent,
    delayTrigger,
    delayEnter,
  });

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation,
    isObserver,
    threshold,
    start,
    horizontal,
  });
  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
