'use client';
import gsap from 'gsap';
import Image from 'next/image';
import type { ReactElement } from 'react';
import { useEffect, useRef } from 'react';

import s from './styles.module.scss';

export default function MobileDisabledRotation(): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOrientationChange = (): void => {
      let angle;
      if (typeof screen.orientation.angle !== 'undefined') {
        angle = screen.orientation.angle;
      }

      const isVertical = angle === 90 || angle === 270 || angle === -90;

      if (!isVertical || window.innerWidth >= 1024) {
        window.lenis?.lenis?.start();
        gsap.to(wrapperRef.current, {
          opacity: 0,
          duration: 0.6,
          overwrite: 'auto',
          ease: 'power3',
          visibility: 'hidden',
          pointerEvents: 'none',
        });
      } else {
        window.lenis?.lenis?.stop();
        gsap.to(wrapperRef.current, {
          opacity: 1,
          duration: 0.6,
          visibility: 'visible',
          pointerEvents: 'auto',
          overwrite: 'auto',
          ease: 'power3',
        });
      }
    };
    handleOrientationChange();
    window.addEventListener('orientationchange', handleOrientationChange);
    return (): void => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return (
    <div className={s.wrapper} ref={wrapperRef}>
      <div className={s.inner}>
        <div className={s.content}>
          <div className={s.shake_phone}>
            <Image
              unoptimized
              src={'/icons/phone-drag.svg'}
              width={64}
              height={64}
              alt="phone-drag"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
