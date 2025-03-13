'use client';

import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRef } from 'react';

import s from './styles.module.scss';

type Props = PropsWithChildren & {
  speed: number;
  scale: number;
  className?: string;
};

const ImageParallax = ({ children, speed, className, scale: scaleInput }: Props): ReactElement => {
  const refWrap = useRef<HTMLDivElement>(null);
  const refEl = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scale = Math.max(1, scaleInput);
    const offset = Number(speed) || 1;
    const yPercent = Math.round(((scale - 1) / 2) * 100) * offset;

    gsap.fromTo(
      refEl.current,
      { scale, yPercent },
      {
        scrollTrigger: {
          trigger: refWrap.current,
          scrub: true,
          once: false,
          invalidateOnRefresh: true,
        },
        yPercent: -yPercent,
        ease: 'none',
      }
    );
  });

  return (
    <div className={classNames(s.imageParallax, className)} ref={refWrap}>
      <div className={s.imageParallax_inner} ref={refEl}>
        {children}
      </div>
    </div>
  );
};

export default ImageParallax;
