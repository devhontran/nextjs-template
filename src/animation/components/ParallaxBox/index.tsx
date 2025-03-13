'use client';

import { MathMap } from '@Utils/mathUtils';
import classNames from 'classnames';
import { useLenis } from 'lenis/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';

import { useEffectContext } from '@/animation/contexts/EffectContext';
import { useUiContext } from '@/animation/contexts/UiContext';

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
  const { height: wH } = useUiContext();
  const { isPageEnter } = useEffectContext();

  useLenis(() => {
    if (!wrapperRef.current || !isPageEnter.peek()) return;
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

    if (innerRef.current)
      innerRef.current.style.transform = `translate3d(0, ${(yTran * speed).toString()}px, 0)`;
  });
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
export default MotionParallaxBox;
