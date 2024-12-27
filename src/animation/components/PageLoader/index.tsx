'use client';

import { useGSAP } from '@gsap/react';
import { useSignalEffect } from '@preact/signals-react';
import cn from 'classnames';
import gsap from 'gsap';
import React, { useRef } from 'react';

import s from './styles.module.scss';

export default function PageLoader(): React.ReactElement {
  const refWrap = useRef<HTMLDivElement>(null);
  const refPo = useRef<HTMLDivElement>(null);
  const { progress } = usePreloader();
  const refAnimate = useRef({ value: 0 });
  const refQT = useRef<gsap.QuickToFunc>();
  const isLoaded = useRef<boolean>(false);

  useGSAP(() => {
    refQT.current = gsap.quickTo(refAnimate.current, 'value', {
      ease: 'power3',
      duration: 1,
      onUpdate: () => {
        const po = Math.round(refAnimate.current.value);
        if (refPo.current) {
          refPo.current.textContent = `PO: ${po}%`;
        }
        if (po >= 100 && !isLoaded.current) {
          isLoaded.current = true;
          pageBeforeEnter();
          gsap.to(refWrap.current, {
            opacity: 0,
            pointerEvents: 'none',
            onComplete: () => {
              pageEnter();
            },
          });
        }
      },
    });
  });

  useSignalEffect(() => {
    refQT.current && !isLoaded.current && refQT.current(Math.round(progress.value * 100));
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
