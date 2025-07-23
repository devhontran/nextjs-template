'use client';

import { type Signal, useSignal } from '@preact/signals-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type React from 'react';
import { useRef } from 'react';

interface IndexInfo {
  index: number;
  last: boolean;
  first: boolean;
}

type Callback = (p: HTMLHeadingElement | null, index: IndexInfo) => void;

interface Props {
  debug?: boolean;
  defaultIndex?: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  paddingRef?: React.RefObject<string>;
  onTextInView?: Callback;
  onTextOutView?: Callback;
  onTextEnter?: Callback;
  onTextEnterBack?: Callback;
  onTextLeave?: Callback;
  onTextLeaveBack?: Callback;
}

interface Return {
  bind: () => void;
  addRef: (ref: HTMLHeadingElement | null, index: number) => void;
  kill: () => void;
  activeIndex: Signal<number>;
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useListScrollTrigger = ({
  debug = false,
  defaultIndex = 0,
  containerRef,
  paddingRef,
  onTextInView,
  onTextOutView,
  onTextEnter,
  onTextEnterBack,
  onTextLeave,
  onTextLeaveBack,
}: Props): Return => {
  const activeIndex = useSignal(defaultIndex);

  const refs = useRef<(HTMLHeadingElement | null)[]>([]);
  const stRef = useRef<ScrollTrigger[]>([]);

  const setActiveIndex = (index: number): void => {
    // eslint-disable-next-line react-compiler/react-compiler
    activeIndex.value = index;
  };

  const bind = (): void => {
    if (!containerRef.current) return;

    const lastIndex = refs.current.filter(Boolean).length - 1;

    refs.current.forEach((p, index) => {
      if (!p) return;

      const indexInfo = {
        index,
        last: index === lastIndex,
        first: index === 0,
      };

      const trigger = ScrollTrigger.create({
        trigger: p,
        start: `top top+=${parseFloat(paddingRef?.current ?? '0px')}px`,
        end: `bottom top+=${parseFloat(paddingRef?.current ?? '0px')}px`,
        scrub: true,
        immediateRender: false,
        invalidateOnRefresh: true,
        markers: debug,
        onEnter: () => {
          const callback = onTextEnter ?? onTextInView;

          if (callback) {
            callback(p, indexInfo);
          }

          setActiveIndex(index);
        },
        onLeave: () => {
          const callback = onTextLeave ?? onTextOutView;

          if (callback) {
            callback(p, indexInfo);
          }
        },
        onEnterBack: () => {
          const callback = onTextEnterBack ?? onTextInView;

          if (callback) {
            callback(p, indexInfo);
          }

          setActiveIndex(index);
        },
        onLeaveBack: () => {
          const callback = onTextLeaveBack ?? onTextOutView;

          if (callback) {
            callback(p, indexInfo);
          }
        },
      });

      stRef.current.push(trigger);
    });
  };

  const kill = (): void => {
    stRef.current.forEach((t) => {
      t.kill();
    });
    refs.current = [];
  };

  const addRef = (ref: HTMLHeadingElement | null, index: number): void => {
    refs.current[index] = ref;
  };

  return { bind, addRef, kill, activeIndex };
};

export default useListScrollTrigger;
