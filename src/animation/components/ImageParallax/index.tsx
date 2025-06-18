'use client';

import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PropsWithChildren, ReactElement } from 'react';
import { memo, useMemo, useRef } from 'react';

import s from './styles.module.scss';

type Props = PropsWithChildren & {
  speed: number;
  scale: number;
  className?: string;
};

const MotionImageParallax = memo(function MotionImageParallax({
  children,
  speed,
  className,
  scale: scaleInput,
}: Props): ReactElement {
  const refWrap = useRef<HTMLDivElement>(null);
  const refEl = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scale = Math.max(1, scaleInput);
    const offset = Number(speed) || 1;
    const yPercent = Math.round(((scale - 1) / 2) * 100) * offset;

    const tl = gsap.fromTo(
      refEl.current,
      { scale, yPercent },
      {
        yPercent: -yPercent,
        ease: 'none',
      }
    );

    ScrollTrigger.create({
      trigger: refWrap.current,
      scrub: true,
      once: false,
      invalidateOnRefresh: true,
      animation: tl,
    });
  }, [speed, scaleInput]);

  const containerClassName = useMemo(
    (): string => classNames(s.imageParallax, className),
    [className]
  );

  return (
    <div className={containerClassName} ref={refWrap}>
      <div className={s.imageParallax_inner} ref={refEl}>
        {children}
      </div>
    </div>
  );
});

MotionImageParallax.displayName = 'MotionImageParallax';

export default MotionImageParallax;
