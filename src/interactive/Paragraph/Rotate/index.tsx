'use client';

import { useIsDesktop } from '@Hooks/useWindowResize';
import SimpleAnimation from '@Interactive/SimpleAnimation';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import useAnimation from '@/hooks/useAnimation';
import { IAnimationProps } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

import useParagraphRotate from './useParagraphRotate';

interface ParagraphLineMaskProps extends PropsWithChildren, IAnimationProps {}

function ParagraphRotateFull({
  children,
  delayEnter,
  delayTrigger,
  isObserver,
  threshold,
}: ParagraphLineMaskProps): ReactElement {
  const refContent = useRef<IAnimationElement>(null);

  const { initAnimation, playAnimation } = useParagraphRotate({
    refContent,
    delayTrigger,
    delayEnter,
    isObserver,
  });

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation,
    threshold,
    isObserver,
  });
  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
}

export default function ParagraphRotate(props: ParagraphLineMaskProps): ReactElement {
  const isDesktop = useIsDesktop();

  return isDesktop ? <ParagraphRotateFull {...props} /> : <SimpleAnimation {...props} />;
}
