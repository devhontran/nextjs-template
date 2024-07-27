'use client';

import { useGSAP } from '@gsap/react';
import { useSignalEffect } from '@preact/signals-react';
import cn from 'classnames';
import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

import s from './styles.module.scss';

export default function PageEffect(): React.ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP();

  const animationIn = contextSafe(() => {
    gsap.to(refContent.current, {
      opacity: 1,
      pointerEvents: 'auto',
      ease: 'power3.out',
      duration: 0.6,
      // onComplete: setInComplete,
    });
  });

  const animationOut = contextSafe(() => {
    gsap.to(refContent.current, {
      opacity: 0,
      ease: 'power3.inOut',
      pointerEvents: 'none',
      duration: 0.5,
      onComplete: () => {
        // isPlayVideoHero.value = true;
        // play();
        // reset();
        // resetStore();
      },
    });
  });

  useSignalEffect(() => {
    // if (toggleState.value) {
    //   resetLoader();
    //   resetForPopup();
    //   resetAnimation();
    //   animationIn();
    // }
  });

  // const isOut = useComputed(() => {
  //   return inCompleteState.value && loadedSate.value;
  // });
  //
  // useSignalEffect(() => {
  //   if (isOut.value && isPlayedState.peek()) {
  //     animationOut();
  //   }
  // });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.onpopstate = (window.history as any).onpushstate = function (): void {
      // animationInEffect(window.location.pathname);
    };
  }, []);

  return (
    <div className={cn(s.transition)} ref={refContent}>
      THIS IS PAGE EFFECT...
    </div>
  );
}
