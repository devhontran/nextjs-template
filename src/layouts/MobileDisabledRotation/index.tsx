'use client';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

import ImagePreload from '@/components/ImagePreload';
import { TypographyBody } from '@/components/Typography';

import s from './styles.module.scss';

export default function MobileDisabledRotation(): JSX.Element {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOrientationChange = (): void => {
      const angle = screen.orientation.angle;
      const isVertical = angle === 90 || angle === 270;

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
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return (
    <div className={s.wrapper} ref={wrapperRef}>
      <div className={s.inner}>
        <div className={s.content}>
          <div className={s.shake_phone}>
            <ImagePreload src={'/icons/phone-drag.svg'} width={64} height={64} alt="phone-drag" />
          </div>
          <TypographyBody className={s.content_text} size={'16'} color="greyBlue">
            This site is only viewable in portrait mode. Please rotate your device.
          </TypographyBody>
        </div>
      </div>
    </div>
  );
}
