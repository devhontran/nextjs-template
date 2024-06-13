'use client';

import useAnimation from '@Hooks/useAnimation';
import { useIsDesktop } from '@Hooks/useWindowResize';
import SimpleAnimation from '@Interactive/SimpleAnimation';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import { IAnimationProps } from '@/types/animation';

import useParagraphLineMask from './useParagraphLineMask';

interface ParagraphLineMaskProps extends PropsWithChildren, IAnimationProps {}

type typeRef = HTMLDivElement | HTMLSpanElement | HTMLHeadingElement | HTMLParagraphElement;

const ParagraphLineMaskFull = ({
  children,
  delayEnter,
  delayTrigger,
  start,
  horizontal,
  markers,
  isObserver,
  threshold,
}: ParagraphLineMaskProps): ReactElement => {
  const refContent = useRef<typeRef>(null);

  const { animationIn: playAnimation, animationHide: initAnimation } = useParagraphLineMask({
    refContent,
    delayTrigger,
    delayEnter,
  });

  useAnimation({
    trigger: refContent,
    initAnimation,
    playAnimation,
    threshold,
    horizontal,
    isObserver,
    start,
    markers,
  });

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return React.cloneElement(children, { ...{ ref: refContent } });
};

export default function ParagraphLineMask(props: ParagraphLineMaskProps): ReactElement {
  const isDesktop = useIsDesktop();
  return isDesktop ? <ParagraphLineMaskFull {...props} /> : <SimpleAnimation {...props} />;
}
