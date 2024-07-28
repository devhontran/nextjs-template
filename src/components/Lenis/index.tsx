'use client';

import { PageStatus, pageStatus } from '@Layouts/Animation/usePageStatus';
import { useSignalEffect } from '@preact/signals-react';
import { easingScrolling } from '@Utils/mathUtils';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import { ReactLenis } from 'lenis/react';
import React, { PropsWithChildren, useRef } from 'react';

interface ISmoothScroller extends PropsWithChildren {}

export default function LenisScroller({ children }: ISmoothScroller): React.ReactElement {
  const lenisRef = useRef<{
    wrapper?: HTMLElement;
    content?: HTMLElement;
    lenis?: Lenis;
  }>({});

  useSignalEffect(() => {
    function update(time: number): void {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    if (pageStatus.value === PageStatus.PAGE_ENTER) {
      lenisRef.current?.lenis?.start();
      gsap.ticker.add(update);
    } else {
      lenisRef.current?.lenis?.stop();
      gsap.ticker.remove(update);
    }

    window.lenis = lenisRef.current;
    lenisRef.current?.lenis?.scrollTo(0);
    return () => {
      gsap.ticker.remove(update);
    };
  });

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
