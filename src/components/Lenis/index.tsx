'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type Lenis from 'lenis';
import { ReactLenis, useLenis } from 'lenis/react';
import type { PropsWithChildren } from 'react';
import React, { useLayoutEffect, useRef } from 'react';

interface ISmoothScroller extends PropsWithChildren {}

export default function LenisScroller({ children }: ISmoothScroller): React.ReactElement {
  const lenisRef = useRef<{
    wrapper?: HTMLElement;
    content?: HTMLElement;
    lenis?: Lenis;
  }>({});

  useLayoutEffect(() => {
    const update = (time: number): void => {
      lenisRef.current.lenis?.raf(time * 1000);
    };

    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useLenis(ScrollTrigger.update);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false}>
      {children}
    </ReactLenis>
  );
}
