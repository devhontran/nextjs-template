'use client';

import { gsap } from 'gsap';
import { type LenisRef, ReactLenis } from 'lenis/react';
import type { PropsWithChildren } from 'react';
import React, { useLayoutEffect, useRef } from 'react';

import { usePageEffectIn, usePageEffectOut, usePageEnter } from '@/animation/hooks/useEffectHooks';

export default function LenisScroller({ children }: PropsWithChildren): React.ReactElement {
  const lenisRef = useRef<LenisRef | null>(null);

  useLayoutEffect(() => {
    function update(time: number): void {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    function initLenis(): void {
      if (!window.lenis?.lenis) {
        window.lenis = lenisRef.current;
        lenisRef.current?.lenis?.stop();
        gsap.ticker.remove(initLenis);
      }
    }

    gsap.ticker.add(update);
    gsap.ticker.add(initLenis);

    return (): void => {
      gsap.ticker.remove(update);
      gsap.ticker.remove(initLenis);
    };
  }, []);

  usePageEnter(() => {
    lenisRef.current?.lenis?.start();
  });

  usePageEffectIn(() => {
    lenisRef.current?.lenis?.stop();
  });

  usePageEffectOut(() => {
    lenisRef.current?.lenis?.start();
  });

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false }}>
      {children}
    </ReactLenis>
  );
}
