'use client';

import { Flex, Text } from '@chakra-ui/react';
import cn from 'classnames';
import gsap from 'gsap';
import React, { useRef } from 'react';

import { useAssetsContext } from '@/animation/contexts/AssetsContext';
import { useEffectContext } from '@/animation/contexts/EffectContext';
import { useDetectPageLoader } from '@/animation/hooks/useDetectPageLoader';
import { usePageEnter } from '@/animation/hooks/useEffectHooks';
import useWinResize from '@/hooks/useWinResize';
import { debounce, gRefresh } from '@/utils/uiHelper';

import { useCharsMaskLeft } from '../Typo/Chars/useCharsMaskLeft';
import LoadingCounter from './LoadingCouter';
import s from './PageLoader.module.scss';

export default function PageLoader(): React.ReactElement {
  const refWrap = useRef<HTMLDivElement>(null);
  const { isDesktop } = useWinResize();
  const refText = useRef<HTMLDivElement>(null);

  const refCounter = useRef<ILoadingCounterRef | null>(null);

  const arrayLoading = [
    Math.floor(Math.random() * (45 - 15 + 1)) + 15,
    Math.floor(Math.random() * (85 - 55 + 1)) + 55,
  ];

  const indexRef = useRef<number>(0);
  const { pagePlay, pageEnter } = useEffectContext();
  const { assetsProgress } = useAssetsContext();

  const pageIn = (): void => {
    motionOutRight();
    refCounter.current?.motionOut();
    setTimeout(() => {
      pagePlay();
    }, 300);

    gsap.to(refWrap.current, {
      opacity: 0,
      delay: 0.3,
      pointerEvents: 'none',
      duration: 0.4,
      ease: 'power3.inOut',
      onComplete: pageEnter,
    });
  };

  const loopLoading = async (): Promise<void> => {
    const po = Math.round(assetsProgress.peek());
    if (po >= 100 && indexRef.current === arrayLoading.length) {
      refCounter.current?.update(100);
      await new Promise((resolve) => setTimeout(resolve, 800));
      pageIn();
      return;
    }
    refCounter.current?.update(arrayLoading[indexRef.current]);
    await new Promise((resolve) => setTimeout(resolve, 800));
    indexRef.current++;
    indexRef.current = Math.min(indexRef.current, arrayLoading.length);
    await loopLoading();
  };

  const debouceSplited = debounce(() => {
    gsap.set(refText.current, { opacity: 1 });
    motionIn();
    refCounter.current?.motionIn();
    setTimeout(() => {
      void loopLoading();
    }, 600);
  }, 100);

  const { motionOutRight, motionIn } = useCharsMaskLeft({
    refContent: refText,
    isInitEffect: true,
    isTriggerMotion: true,
    onSplited: () => {
      debouceSplited();
    },
  });

  useDetectPageLoader();
  usePageEnter(() => {
    gRefresh(100);
  });

  const textConfig = {
    fontFamily: 'var(--font-f37-judge)',
    fontWeight: 700,
    fontSize: { base: '11.4rem', sm: '15.6rem', md: '27.6rem' },
    lineHeight: !isDesktop ? '60%' : '90%',
    textTransform: 'uppercase',
    color: '#0070FF',
  };

  return (
    <div className={cn(s.pageLoader)} ref={refWrap}>
      <Flex
        justifyContent={'space-between'}
        position="absolute"
        flexWrap={'wrap'}
        flexDirection={{ base: 'column-reverse', sm: 'row' }}
        left={{ base: '1.6rem', md: '2.4rem' }}
        right={{ base: '1.6rem', md: '2.4rem' }}
        bottom={{ base: '3.2rem', sm: '2.6rem', md: '-1rem' }}
      >
        <Text
          as="div"
          ref={refText}
          {...textConfig}
          opacity={0}
          css={{
            '& .char-mask': {
              paddingTop: '0.2em',
              paddingBottom: '0.2em',
              marginBottom: '-0.2em',
            },
          }}
        >
          LOADING
        </Text>

        <Text as="div" {...textConfig}>
          <LoadingCounter refCounter={refCounter} />
        </Text>
      </Flex>
    </div>
  );
}
