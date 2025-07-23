'use client';

import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import { useSignalEffect } from '@preact/signals-react';
import classNames from 'classnames';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { useLayoutEffect, useRef } from 'react';

import { useEffectContext } from '@/animation/contexts/EffectContext';
import { useUiContext } from '@/animation/contexts/UiContext';
import { usePageEnter } from '@/animation/hooks/useEffectHooks';
import { MathMap } from '@/utils/mathUtils';
import { pageScrollTop } from '@/utils/uiHelper';

import s from './styles.module.scss';

type Props = PropsWithChildren &
  BoxProps & {
    speed?: number;
    min?: number;
    max?: number;
    isBackground?: boolean;
    className?: string;
    classNameImage?: string;
    offset?: number;
    start?: number;
    isFadeEffect?: boolean;
    isClip?: boolean;
  };

const MotionParallaxBox = ({
  min,
  max,
  isBackground,
  className,
  classNameImage,
  children,
  offset = 0.5,
  start = 0.5,
  speed = 1,
  isFadeEffect = false,
  isClip = false,
  ...props
}: Props): ReactElement => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const refBg = useRef<HTMLDivElement>(null);

  const { height: wH, isDesktop } = useUiContext();
  const { isPageEnter } = useEffectContext();
  const refQuick = useRef<((n: number) => void) | null>(null);
  const refQuickOpacity = useRef<((n: number) => void) | null>(null);
  const recPos = useRef<{
    top: number;
    height: number;
    bottom: number;
  }>({
    top: 0,
    height: 0,
    bottom: 0,
  });

  const calcPos = (): void => {
    const { top, height, bottom } = wrapperRef.current?.getBoundingClientRect() ?? {};
    recPos.current = {
      top: (top ?? 0) + pageScrollTop(),
      height: height ?? 0,
      bottom: (bottom ?? 0) + pageScrollTop(),
    };
  };

  useGSAP(() => {
    refQuick.current = gsap.quickSetter(innerRef.current, 'y', 'px') as (n: number) => void;
    refQuickOpacity.current = gsap.quickSetter(refBg.current, 'opacity') as (n: number) => void;
  });

  useLayoutEffect(() => {
    if (isFadeEffect) innerRef.current?.classList.add(s.isFade);
    else innerRef.current?.classList.remove(s.isFade);
  }, [speed]);

  // Memoize the scroll handler to prevent recreating on every render
  const handleScroll = (): void => {
    if (!wrapperRef.current || !isPageEnter.peek() || !isDesktop.peek()) return;
    const { top: rectTop, height, bottom: rectBottom } = recPos.current;
    const wHeight = wH.value;

    const top = rectTop - pageScrollTop();
    const bottom = rectBottom - pageScrollTop();

    const elementStart = offset < 0 ? height - wHeight * Math.abs(offset) : wHeight * offset;
    const windowStart = start < 0 ? wHeight - wHeight * Math.abs(start) : wHeight * start;
    const lenParallax = speed * wHeight * 0.5;

    const inView = bottom > 0 && top < wHeight;
    if (!inView) return;

    const center = top + elementStart;
    let yTran = MathMap(center, windowStart, -wHeight / 2, 0, lenParallax);

    if (min !== undefined) {
      yTran = Math.min(yTran, min);
    }
    if (max !== undefined) {
      yTran = Math.max(yTran, max);
    }

    refQuick.current?.(yTran);
    if (isFadeEffect) {
      let opacity = 0;
      if (top < 0) {
        opacity = MathMap(bottom, wHeight * 0.35, 0, 0, 0.8);
      } else if (bottom > wHeight && max !== 0) {
        opacity = MathMap(top, wHeight, wHeight - wHeight * 0.35, 0.8, 0);
      }

      refQuickOpacity.current?.(Math.max(Math.min(opacity, 1), 0));
    }
  };

  useLenis(handleScroll);
  usePageEnter(calcPos);
  useSignalEffect(() => {
    calcPos();
    handleScroll();
  });

  return (
    <Box
      ref={wrapperRef}
      className={classNames(
        s.parallaxBox,
        { [s.isBackground]: isBackground },
        { [s.isClip]: isClip },
        className
      )}
      position={'relative'}
      {...props}
    >
      <div ref={innerRef} className={classNames(s.parallaxBox_inner, classNameImage)}>
        {children}
      </div>
      {isFadeEffect && (
        <Box
          ref={refBg}
          position={'absolute'}
          top={0}
          left={0}
          w={'100%'}
          h="100%"
          bg={'black'}
          opacity={0}
          willChange={'opacity'}
          pointerEvents={'none'}
        />
      )}
    </Box>
  );
};

// Add display name for dev tools
export default MotionParallaxBox;
