'use client';

import { useGSAP } from '@gsap/react';
import { useSignal, useSignalEffect } from '@preact/signals-react';
import cn from 'classnames';
import gsap from 'gsap';
import React, { useRef } from 'react';

import { useAssetsContext } from '@/animation/contexts/AssetsContext';
import { useEffectContext } from '@/animation/contexts/EffectContext';
import { useDetectPageLoader } from '@/animation/hooks/useDetectPageLoader';
import { usePageEnter } from '@/animation/hooks/useEffectHooks';
import { gRefresh } from '@/utils/uiHelper';

import s from './PageLoader.module.scss';

export default function PageLoader(): React.ReactElement {
  const refWrap = useRef<HTMLDivElement>(null);
  const refPo = useRef<HTMLDivElement>(null);
  const refAnimate = useRef({ value: 0 });
  const refQT = useRef<gsap.QuickToFunc>(null);
  const isLoaded = useSignal<boolean>(false);

  const { pagePlay, pageEnter } = useEffectContext();
  const { assetsProgress } = useAssetsContext();

  useGSAP(() => {
    refQT.current = gsap.quickTo(refAnimate.current, 'value', {
      ease: 'power3',
      duration: 1,
      onUpdate: () => {
        const po = Math.round(refAnimate.current.value);

        if (refPo.current) {
          refPo.current.textContent = `PO: ${po.toString()}%`;
        }
        if (po >= 100 && !isLoaded.value) {
          // eslint-disable-next-line react-compiler/react-compiler
          isLoaded.value = true;
          pagePlay();
          gsap.to(refWrap.current, { opacity: 0, pointerEvents: 'none', onComplete: pageEnter });
        }
      },
    });
  });

  useSignalEffect(() => {
    const po = Math.round(assetsProgress.value);
    if (!isLoaded.peek()) {
      refQT.current?.(po);
    }
  });

  useDetectPageLoader();
  usePageEnter(() => {
    gRefresh(100);
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
