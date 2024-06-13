'use client';

import useAnimation from '@Hooks/useAnimation';
import { useIsDesktop } from '@Hooks/useWindowResize';
import useHeadingRotate from '@Interactive/Heading/Type/Rotate/useCharRotate';
import SimpleAnimation from '@Interactive/SimpleAnimation';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface ParagraphLineMaskProps extends PropsWithChildren, IAnimationProps {
  startInner?: string;
  endInner?: string;
  isParallaxScroll?: boolean;
}

function HeadingRotateFull({
  children,
  delayEnter,
  delayTrigger,
  isObserver,
  threshold,
  start,
  horizontal,
  startInner,
  endInner,
  isParallaxScroll,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<IAnimationElement>(null);

  const { initAnimation, playAnimation } = useHeadingRotate({
    refContent,
    delayTrigger,
    delayEnter,
    startInner,
    endInner,
    isParallaxScroll,
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

export default function HeadingRotate(props: ParagraphLineMaskProps): ReactElement {
  const isDesktop = useIsDesktop();
  return isDesktop ? <HeadingRotateFull {...props} /> : <SimpleAnimation {...props} />;
}
