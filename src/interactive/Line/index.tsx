'use client';

import { useGSAP } from '@gsap/react';
import useAnimation from '@Hooks/useAnimation';
import { getDelay } from '@Utils/uiHelper';
import cn from 'classnames';
import { gsap } from 'gsap';
import React, { CSSProperties, useCallback, useRef } from 'react';

import useWindowResize from '@/hooks/useWindowResize';
import { IAnimationProps } from '@/types/animation';

import s from './styles.module.scss';

interface IProp extends IAnimationProps {
  color?: 'white' | 'black-grey' | 'silver';
  size?: number;
  classNames?: string;
  direction?: 'bottom' | 'left' | 'right' | 'top';
  isStatic?: boolean;
}

export default function Line({
  color = 'white',
  size = 1,
  delayTrigger,
  delayEnter,
  duration,
  classNames,
  direction = 'bottom',
  isStatic = false,
}: IProp): React.ReactElement {
  const isHorizonal = direction === 'top' || direction === 'bottom';
  const lineRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useWindowResize();

  const { contextSafe } = useGSAP();
  const initAnimation = contextSafe((): void => {
    if (!isStatic || isMobile.value) return;
    if (isHorizonal) {
      gsap.set(lineRef.current, { scaleX: 0 });
    } else {
      gsap.set(lineRef.current, { scaleY: 0 });
    }
  });

  const getDelayCallBack = useCallback((): number => {
    return getDelay({ refContentCurrent: lineRef.current, delayEnter, delayTrigger });
  }, [lineRef]);

  const playAnimation = contextSafe((): void => {
    if (isStatic || isMobile.value) return;
    const delay = getDelayCallBack();

    if (isHorizonal) {
      gsap.to(lineRef.current, {
        scaleX: 1,
        ease: 'power3.inOut',
        duration: duration || 1.2,
        delay,
      });
    } else {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: 'power3.inOut',
        duration: duration || 1.2,
        delay,
      });
    }
  });

  useAnimation({
    trigger: lineRef,
    initAnimation,
    playAnimation,
    isObserver: true,
    threshold: 100,
    start: 'top 90%',
  });

  return (
    <div
      ref={lineRef}
      className={cn(s.line, s[`line__${color}`], s[`line__${direction}`], classNames)}
      style={{ '--size': `${size}px` } as CSSProperties}
    ></div>
  );
}
