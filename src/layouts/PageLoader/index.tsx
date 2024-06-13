import { useGSAP } from '@gsap/react';
import useAnimationSignal, { isPlayState } from '@Layouts/Animation/animationSignal';
import { loadedSate, proxyLoader } from '@Layouts/Animation/loadManageSignal';
import { signal } from '@preact/signals-core';
import { useSignalEffect } from '@preact/signals-react';
import { MathMap } from '@Utils/mathUtils';
import cn from 'classnames';
import { gsap } from 'gsap';
import Image from 'next/image';
import React, { useRef } from 'react';
import { proxy } from 'valtio';

import { TypographyBody, TypographyLabel } from '@/components/Typography';

import s from './styles.module.scss';
import useProcessingR3f from '@Layouts/PageLoader/useProcessingR3f';

export const PageLoaderProxy = proxy<{
  isAssetsLoaded: boolean;
  isAnimation: boolean;
  isR3fLoaded: boolean;
}>({
  isAnimation: false,
  isAssetsLoaded: false,
  isR3fLoaded: false,
});

export const isStartedState = signal<boolean>(false);

export default function PageLoader(): React.ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const refPersent = useRef<HTMLSpanElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { play, setPlayed } = useAnimationSignal();

  const dataProxy = useRef<{
    percent: number;
    isAssetLoaded: boolean;
    isAnimationIn: boolean;
    looper: { po: number; offset: number; deal: number };
  }>({
    percent: 0,
    isAssetLoaded: false,
    isAnimationIn: false,
    looper: {
      po: 0,
      offset: 0,
      deal: 1,
    },
  });
  const refQuickProcessing = useRef<gsap.QuickToFunc>();
  const processBoRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set('.js-fade', { opacity: 0, y: 24 });
      refQuickProcessing.current = gsap.quickTo(dataProxy.current, 'percent', {
        ease: 'power3.out',
        duration: 0.4,
        onUpdate: () => {
          const ps = Math.floor(dataProxy.current.percent);
          if (refPersent.current) {
            processBoRef.current?.style?.setProperty('--po', `${ps / 100}`);
            refPersent.current.textContent = `${ps < 10 ? '0' : ''}${ps}%`;
          }
        },
      });

      const _isLoaded = (): boolean => {
        return PageLoaderProxy.isR3fLoaded && loadedSate.peek();
      };

      const getProgrees = (): number => {
        const r3fPo = !PageLoaderProxy.isR3fLoaded ? 0 : 10;
        const loaded = proxyLoader.total - proxyLoader.counter;
        const po = MathMap(loaded + r3fPo, 0, proxyLoader.total + 10, 0, 100);
        return po;
      };

      const looper = (): void => {
        if (!dataProxy.current.isAnimationIn) return;

        const po = Math.floor(getProgrees());
        refQuickProcessing.current && refQuickProcessing.current(po);

        if (po >= 100) {
          gsap.ticker.remove(looper);
          refQuickProcessing.current && refQuickProcessing.current(100);
          dataProxy.current.isAssetLoaded = true;
          setTimeout(animationOut, 300);
        }
      };
      gsap.ticker.add(looper);
      return () => {
        gsap.ticker.remove(looper);
      };
    },
    { scope: wrapperRef }
  );

  const animationIn = contextSafe(() => {
    window.scrollTo(0, 0);
    gsap.to('.js-fade', {
      opacity: 1,
      ease: 'power3.inOut',
      duration: 0.6,
      y: 0,
      stagger: 0.1,
      onComplete: () => {
        dataProxy.current.isAnimationIn = true;
      },
    });
  });

  const animationOut = contextSafe(()=>{
    gsap.to(wrapperRef.current, {
      opacity: 0,
      ease: 'power3.inOut',
      duration: 0.6,
      onComplete: () => {
        play();
        setPlayed();
      },
    });
  })

  useSignalEffect(() => {
    if (isPlayState.value && wrapperRef.current) {
      wrapperRef.current.remove();
    }
  });

  useGSAP(() => {
    animationIn();
  });
  useProcessingR3f();

  return (
    <div className={cn(s.wrapper)} ref={wrapperRef}>
      <div className={s.pageLoader} ref={refContent}>
        <div className={s.homeLoader}>
          <TypographyLabel color="greyBlue" className={`${s.fade} js-fade js-outing`}>
            Deepsee
          </TypographyLabel>
          <div className={`${s.homeLoader_logo} js-fade js-homeLoader_logo`}>
            <Image src={'/preloader.gif'} width={240} height={240} alt={'gif'} />
          </div>
          <div className={cn(s.homeLoader_progress)}>
            <TypographyBody color="greyBlue" className={`${s.fade} js-fade js-outing`}>
              Loading experience
            </TypographyBody>
            <span
              className={cn(
                s.homeLoader_progress_percent,
                'lg:col-start-9 col-span-4 sm:col-span-5 lg:col-span-4'
              )}
            >
              <span className={`js-fade js-outing`} ref={refPersent}>
                00%
              </span>
            </span>
          </div>
        </div>
        <div className={s.processBar} ref={processBoRef} />
      </div>
    </div>
  );
}
