'use client';

import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import cn from 'classnames';
import { gsap } from 'gsap';
import type { PropsWithChildren } from 'react';
import React, { useLayoutEffect, useMemo, useRef } from 'react';

import { useEffectContext } from '@/animation/contexts/EffectContext';
import { usePageEffectIn, usePageEffectOut } from '@/animation/hooks/useEffectHooks';
import useRouterEffect from '@/animation/hooks/useRouterEffect';
import type { NavigationEvent } from '@/types/global';

import s from './PageEffect.module.scss';

// Constants for grid
const GRID_COLS = 10;
const GRID_ROWS = 3;
const GRID_TOTAL = GRID_COLS * GRID_ROWS;

interface EffectItemModel {
  id: string;
  row: number;
  col: number;
  index: number;
  distanceToCenter: number;
}

export default function PageEffect({ children }: PropsWithChildren): React.ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const refPage = useRef<HTMLDivElement>(null);

  const { routerPush, routerPrefetch, isEffectHistory } = useRouterEffect();
  const { pageEnter, pagePlay } = useEffectContext();

  function getEffectItems(): EffectItemModel[] {
    const centerCol = (GRID_COLS - 1) / 2;
    const centerRow = (GRID_ROWS - 1) / 2;
    const items: EffectItemModel[] = [];
    for (let i = 0; i < GRID_TOTAL; i++) {
      const row = Math.floor(i / GRID_COLS);
      const col = i % GRID_COLS;
      const distanceToCenter = Math.sqrt(
        Math.pow(col - centerCol, 2) + Math.pow(row - centerRow, 2)
      );
      items.push({
        id: `effect-item-${row}-${col}`,
        row,
        col,
        index: i,
        distanceToCenter,
      });
    }
    return items;
  }

  const effectItems: EffectItemModel[] = useMemo(() => {
    return getEffectItems();
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      const items = gsap.utils.toArray('.js-effect-item');
      if (items.length) {
        gsap.set(items, {
          scaleX: 0,
        });
      }
    },
    {
      scope: refContent,
    }
  );

  const animationIn = contextSafe(() => {
    if (!refContent.current) return;

    if (isEffectHistory()) {
      routerPush();
      return;
    }

    gsap.set(refContent.current, {
      pointerEvents: 'auto',
    });

    const items = gsap.utils.toArray('.js-effect-item');
    if (items.length) {
      gsap.to(items, {
        scaleX: 1.01,
        scaleY: 1.01,
        ease: 'power3.out',
        duration: 0.4,
        stagger: {
          amount: 0.4,
          grid: [GRID_ROWS, GRID_COLS],
          from: 'center',
        },
        onComplete: routerPush,
      });
    }
  });

  const animationOut = contextSafe(() => {
    if (!refContent.current) return;

    if (isEffectHistory()) {
      gsap.to(refPage.current, {
        opacity: 1,
        ease: 'power3.inOut',
        duration: 0.5,
        onStart: () => {
          setTimeout(() => {
            pagePlay();
          }, 250);
        },
        onComplete: () => {
          pageEnter();
          gsap.set(refContent.current, {
            pointerEvents: 'none',
          });
        },
      });
      return;
    }

    const items = gsap.utils.toArray('.js-effect-item');
    if (items.length) {
      gsap.to(items, {
        scaleX: 0,
        scaleY: 1.01,
        ease: 'power3.in',
        duration: 0.5,
        stagger: {
          amount: 0.5,
          grid: [GRID_ROWS, GRID_COLS],
          from: 'center',
        },
        onStart: () => {
          setTimeout(() => {
            pagePlay();
          }, 250);
        },
        onComplete: () => {
          pageEnter();

          gsap.set(refContent.current, {
            pointerEvents: 'none',
          });
        },
      });
    }
  });

  usePageEffectOut(animationOut);
  usePageEffectIn(animationIn);

  useLayoutEffect(() => {
    const navigationTransition = (e: NavigationEvent): void => {
      if (!e.destination?.url.includes(document.location.origin)) return;
      let rePath: string = e.destination.url.replace(document.location.origin, '');
      if (rePath === '') rePath = '/';
      if (e.navigationType === 'traverse') {
        gsap.set(refPage.current, { opacity: 0 });
        routerPrefetch({
          pathName: rePath,
          typeEffect: 'history',
        });
      }
    };

    if (window.navigation?.addEventListener) {
      window.navigation.addEventListener('navigate', navigationTransition);
    }

    return (): void => {
      if (window.navigation?.removeEventListener) {
        window.navigation.removeEventListener('navigate', navigationTransition);
      }
    };
  }, []);

  return (
    <>
      <Box ref={refPage} willChange={'opacity'}>
        {children}
      </Box>
      <Box
        className={cn(s.transition)}
        ref={refContent}
        display={'grid'}
        gridTemplateColumns={`repeat(${GRID_COLS}, 1fr)`}
        gridTemplateRows={`repeat(${GRID_ROWS}, 1fr)`}
        alignContent={'center'}
        justifyContent={'center'}
      >
        {effectItems.map((item) => (
          <Box
            bg="#0070FF"
            key={item.id}
            willChange={'transform'}
            className="js-effect-item"
            data-index={item.index}
            data-row={item.row}
            data-col={item.col}
          />
        ))}
      </Box>
    </>
  );
}
