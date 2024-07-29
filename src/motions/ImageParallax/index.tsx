import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { PropsWithChildren, ReactElement, useRef } from 'react';

import s from './styles.module.scss';

interface IImageParallaxProps extends PropsWithChildren {
  speed: number;
  scale: number;
}

export default function MotionImageParallax({
  children,
  speed,
  scale: scaleInput,
}: IImageParallaxProps): ReactElement {
  const refWrap = useRef<HTMLDivElement>(null);
  const refEl = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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
    <div className={s.imageParallax} ref={refWrap}>
      <div className={s.imageParallax_inner} ref={refEl}>
        {children}
      </div>
    </div>
  );
}
