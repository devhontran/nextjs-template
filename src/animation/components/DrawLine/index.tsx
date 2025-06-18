'use client';

import cn from 'classnames';
import gsap from 'gsap';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';

import useAnimate from '@/animation/hooks/useAnimate';
import type { IAnimationProps } from '@/types/animation';

import { DrawLineDirection } from './enums';
import styles from './styles.module.scss';

type Props = PropsWithChildren & {
  motion?: IAnimationProps;
  direction?: DrawLineDirection;
};

const MotionDrawLine = ({
  children,
  motion,
  direction = DrawLineDirection.LEFT,
}: Props): ReactElement => {
  const contentRef = useRef<HTMLDivElement>(null);

  const animate = (tweenVars: gsap.TweenVars): void => {
    gsap.fromTo(
      contentRef.current,
      { scaleX: 0 },
      {
        ...tweenVars,
        scaleX: 1,
        ease: 'power3.inOut',
        duration: 1.2,
      }
    );
  };

  useAnimate({
    refContent: contentRef,
    motion,
    animate,
  });

  return (
    <div ref={contentRef} className={cn(styles.drawLine, styles[direction])}>
      {children}
    </div>
  );
};

MotionDrawLine.displayName = 'MotionDrawLine';

export default MotionDrawLine;
