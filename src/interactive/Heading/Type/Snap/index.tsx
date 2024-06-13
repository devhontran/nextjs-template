'use client';

import useAnimation from '@Hooks/useAnimation';
import { useIsDesktop } from '@Hooks/useWindowResize';
import useHeadingSnap from '@Interactive/Heading/Type/Snap/useCharSnap';
import SimpleAnimation from '@Interactive/SimpleAnimation';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface ParagraphLineMaskProps extends PropsWithChildren, IAnimationProps {
  isParallaxScroll?: boolean;
}

function HeadingSnapFull({
  children,
  delayEnter,
  delayTrigger,
  isObserver,
  threshold,
  start,
  horizontal,
  isParallaxScroll,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<IAnimationElement>(null);

  const { initAnimation, playAnimation } = useHeadingSnap({
    refContent,
    delayTrigger,
    delayEnter,
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

export default function HeadingSnap(props: ParagraphLineMaskProps): ReactElement {
  const isDesktop = useIsDesktop();

  return isDesktop ? <HeadingSnapFull {...props} /> : <SimpleAnimation {...props} />;
}
