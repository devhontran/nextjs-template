'use client';

import { easingScrolling } from '@Utils/mathUtils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from 'lenis';
import { ReactLenis, useLenis } from 'lenis/react';
import React, { PropsWithChildren, useEffect, useRef } from 'react';

interface ISmoothScroller extends PropsWithChildren {}

export default function LenisScroller({ children }: ISmoothScroller): React.ReactElement {
  const lenisRef = useRef<{
    wrapper?: HTMLElement;
    content?: HTMLElement;
    lenis?: Lenis;
  }>({});

  useEffect(() => {
    const update = (time: number): void => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    // lenisRef.current?.lenis?.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  // useSignalEffect(() => {
  //   if (pageStatus.value === PageStatus.PAGE_ENTER) {
  //     lenisRef.current?.lenis?.start();
  //   } else {
  //     lenisRef.current?.lenis?.stop();
  //   }
  // });

  useLenis(ScrollTrigger.update);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        duration: 2,
        lerp: 0.05,
        easing: easingScrolling,
        syncTouch: true,
        syncTouchLerp: 0.025,
      }}
    >
      {children}
    </ReactLenis>
  );
}
