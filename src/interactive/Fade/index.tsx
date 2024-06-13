'use client';

import React, { PropsWithChildren, useRef } from 'react';

import useAnimation from '@/hooks/useAnimation';
import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

import useFade from './useFade';

interface IFade extends PropsWithChildren, IAnimationProps {
  direction?: 'top' | 'bottom' | 'left' | 'right' | 'none';
  from?: string;
  lengthRef?: boolean;
}

export default function Fade({
  direction = 'bottom',
  delayTrigger,
  delayEnter,
  children,
  duration,
  from,
  isObserver,
  lengthRef,
  threshold,
  start,
  horizontal,
}: IFade): React.ReactElement {
  const refContent = useRef<IAnimationElement>(null);

  const { initAnimation, playAnimation } = useFade({
    refContent,
    delayTrigger,
    delayEnter,
    direction,
    duration,
    from,
    lengthRef,
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
