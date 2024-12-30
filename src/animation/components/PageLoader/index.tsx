'use client';

import { useGSAP } from '@gsap/react';
import { useSignal, useSignalEffect } from '@preact/signals-react';
import cn from 'classnames';
import gsap from 'gsap';
import React, { useRef } from 'react';

import { useLoader } from '@/animation/hooks/useLoader';
import { pageEnter, pagePlay } from '@/animation/signals/pageSignals';

import s from './styles.module.scss';

export default function PageLoader(): React.ReactElement {
  const refWrap = useRef<HTMLDivElement>(null);
  const refPo = useRef<HTMLDivElement>(null);
  const refAnimate = useRef({ value: 0 });
  const refQT = useRef<gsap.QuickToFunc>();
  const isLoaded = useSignal<boolean>(false);

  const { progress } = useLoader();

  useGSAP(() => {
    refQT.current = gsap.quickTo(refAnimate.current, 'value', {
      ease: 'power3',
      duration: 1,
      onUpdate: () => {
        const po = Math.round(refAnimate.current.value);

        if (refPo.current) {
          refPo.current.textContent = `PO: ${po}%`;
        }
        if (po >= 100 && !isLoaded.value) {
          isLoaded.value = true;
          pagePlay();
          gsap.to(refWrap.current, {
            opacity: 0,
            pointerEvents: 'none',
            onComplete: pageEnter,
          });
        }
      },
    });
  });

  useSignalEffect(() => {
    const po = Math.round(progress.value);
    refQT.current && !isLoaded.peek() && refQT.current(po);
  });

  return (
    <div className={cn(s.pageLoader)} ref={refWrap}>
      <div>
        <div>THIS IS PAGE LOADER....</div>
        <div className={s.po} ref={refPo}></div>
      </div>
    </div>
  );
}
