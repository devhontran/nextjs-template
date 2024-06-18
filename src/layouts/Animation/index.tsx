'use client';

import { useGSAP } from '@gsap/react';
import { isPlayState } from '@Layouts/Animation/animationSignal';
import PageLoader from '@Layouts/PageLoader';
import { useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { PropsWithChildren, ReactElement, useEffect, useRef } from 'react';

import useWindowResize from '@/hooks/useWindowResize';

interface IProp extends PropsWithChildren {}

if (typeof window !== 'undefined') {
  history.scrollRestoration = 'manual';
}

export default function Animate({ children }: IProp): ReactElement {
  const { scrollHeight } = useWindowResize();
  const mainRef = useRef<HTMLElement>(null);

  const { contextSafe } = useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  });
  const onRefresh = contextSafe(() => {
    mainRef.current && ScrollTrigger.refresh();
  });

  useSignalEffect(() => {
    scrollHeight.value && isPlayState.value && onRefresh();
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
    history.scrollRestoration = 'manual';

    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    const removeSpaceDown = (e: KeyboardEvent): void => {
      if (
          (e.keyCode === 32 || e.keyCode === 38 || e.keyCode === 40) &&
          e.target === document.body
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', removeSpaceDown);
    return () => {
      window.removeEventListener('keydown', removeSpaceDown);
    };
  }, []);

  return (
      <main ref={mainRef}>
        <PageLoader />
        {children}
      </main>
  );
}
