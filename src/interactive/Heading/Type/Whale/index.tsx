'use client';

import useAnimation from '@Hooks/useAnimation';
import { useIsDesktop } from '@Hooks/useWindowResize';
import useHeadingCharsWhale from '@Interactive/Heading/Type/Whale/useCharWhale';
import SimpleAnimation from '@Interactive/SimpleAnimation';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';
interface ParagraphLineMaskProps extends PropsWithChildren, IAnimationProps {}

function HeadingWhaleFull({
  children,
  delayEnter,
  delayTrigger,
  isObserver,
  threshold,
  start,
  horizontal,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<IAnimationElement>(null);

  const { initAnimation, playAnimation } = useHeadingCharsWhale({
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

export default function HeadingWhale(props: ParagraphLineMaskProps): ReactElement {
  const isDesktop = useIsDesktop();
  return isDesktop ? <HeadingWhaleFull {...props} /> : <SimpleAnimation {...props} />;
}
