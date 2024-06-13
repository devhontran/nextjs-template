'use client';

import useFade from '@Interactive/Fade/useFade';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import useAnimation from '@/hooks/useAnimation';
import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface ParagraphLineMaskProps extends PropsWithChildren, IAnimationProps {}
export default function SimpleAnimation({
  children,
  delayEnter,
  delayTrigger,
  isObserver,
  horizontal,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<IAnimationElement>(null);

  const { initAnimation, playAnimation } = useFade({
    refContent,
    delayTrigger,
    delayEnter,
    duration: 0.8,
    ease: 'power3.inOut',
    from: '40px',
  });

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation,
    isObserver,
    threshold: 30,
    horizontal,
  });
  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}
