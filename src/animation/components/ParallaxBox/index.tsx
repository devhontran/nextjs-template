'use client';

import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { useEffect, useRef } from 'react';

import { useEffectContext } from '@/animation/contexts/EffectContext';
import { useUiContext } from '@/animation/contexts/UiContext';
import { MathMap } from '@/utils/mathUtils';

import s from './styles.module.scss';

type Props = PropsWithChildren & {
  speed: number;
  min?: number;
  max?: number;
  isBackground?: boolean;
  className?: string;
  classNameImage?: string;
};

const MotionParallaxBox = ({
  speed,
  min,
  max,
  isBackground,
  className,
  classNameImage,
  children,
}: Props): ReactElement => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { height: wH, isDesktop } = useUiContext();
  const { isPageEnter } = useEffectContext();
  const refQuick = useRef<((n: number) => void) | null>(null);
  const refQuickOpacity = useRef<((n: number) => void) | null>(null);

  useGSAP(() => {
    if (innerRef.current && !refQuick.current) {
      refQuick.current = gsap.quickSetter(innerRef.current, 'y', 'px') as (n: number) => void;
    }
    if (innerRef.current && !refQuickOpacity.current) {
      refQuickOpacity.current = gsap.quickSetter(innerRef.current, 'opacity', 'number') as (
        n: number
      ) => void;
    }
  });

  useEffect(() => {
    if (speed === 1) innerRef.current?.classList.add(s.isFade);
    else innerRef.current?.classList.remove(s.isFade);
  }, [speed]);

  // Memoize the scroll handler to prevent recreating on every render
  const handleScroll = (): void => {
    if (!wrapperRef.current || !isPageEnter.peek() || !isDesktop.peek()) return;
    const { top, height } = wrapperRef.current.getBoundingClientRect();
    const wHeight = wH.value;

    const center = top + height / 2 + (height - wHeight);
    let yTran = MathMap(center, wHeight, 0, -wHeight / 2, wHeight / 2);

    if (min !== undefined) {
      yTran = Math.min(yTran, min);
    }
    if (max !== undefined) {
      yTran = Math.max(yTran, max);
    }

    if (refQuick.current) {
      refQuick.current(yTran * speed);
    }

    if (speed === 1) {
      const offsetOpacity = 0.5;
      const opacity =
        yTran < wHeight / 2
          ? MathMap(yTran, -wHeight, -wHeight + wHeight * offsetOpacity, 0, 1)
          : MathMap(yTran, wHeight - wHeight * offsetOpacity, wHeight, 1, 0);
      if (refQuickOpacity.current) {
        refQuickOpacity.current(opacity);
      }
    }
  };

  useLenis(handleScroll);

  return (
    <div
      ref={wrapperRef}
      className={classNames(s.parallaxBox, { [s.isBackground]: isBackground }, className)}
    >
      <div ref={innerRef} className={classNames(s.parallaxBox_inner, classNameImage)}>
        {children}
      </div>
    </div>
  );
};

// Add display name for dev tools
export default MotionParallaxBox;
