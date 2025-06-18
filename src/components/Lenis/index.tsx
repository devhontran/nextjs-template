'use client';

import { useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import { type LenisRef, ReactLenis } from 'lenis/react';
import type { PropsWithChildren } from 'react';
import React, { useLayoutEffect, useRef } from 'react';

import { usePageEffectIn, usePageEffectOut, usePageEnter } from '@/animation/hooks/useEffectHooks';
import { useMenuController } from '@/providers/MenuControllerProvider';

export default function LenisScroller({ children }: PropsWithChildren): React.ReactElement {
  const lenisRef = useRef<LenisRef | null>(null);
  const { isOpenMenu } = useMenuController();
  useLayoutEffect(() => {
    function update(time: number): void {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    return (): void => {
      gsap.ticker.remove(update);
    };
  }, []);

  useSignalEffect(() => {
    if (isOpenMenu.value) {
      lenisRef.current?.lenis?.stop();
    } else {
      lenisRef.current?.lenis?.start();
    }
  });

  usePageEnter(() => {
    lenisRef.current?.lenis?.start();
    window.lenis = lenisRef.current?.lenis;
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
