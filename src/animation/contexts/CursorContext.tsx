'use client';

import type { Signal } from '@preact/signals-react';
import { useSignal, useSignalEffect } from '@preact/signals-react';
import gsap from 'gsap';
import type { ReactElement, ReactNode } from 'react';
import { createContext, use, useMemo } from 'react';

import { CursorType } from '@/enum/animation';

import { useUiContext } from './UiContext';

interface CursorContextValue {
  cursorType: Signal<CursorType>;
  cursorHistoryType: Signal<CursorType>;
  setCursorType: (type: CursorType) => void;
  cursorPositionX: Signal<number>;
  cursorPositionY: Signal<number>;
  clientX: Signal<number>;
  clientY: Signal<number>;
  showCsCursor: (type: CursorType) => void;
  hideCsCursor: () => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function useCursorContext(): CursorContextValue {
  const context = use(CursorContext);
  if (!context) {
    throw new Error('useCursorContext must be used within CursorProvider');
  }
  return context;
}

export function CursorProvider({ children }: { children: ReactNode }): ReactElement {
  const { isDesktop } = useUiContext();
  const cursorHistoryType = useSignal<CursorType>(CursorType.DEFAULT);
  const cursorType = useSignal<CursorType>(CursorType.DEFAULT);

  const cursorPositionX = useSignal(0);
  const cursorPositionY = useSignal(0);

  const clientX = useSignal(0);
  const clientY = useSignal(0);

  const setCursorType = (type: CursorType): void => {
    if (!isDesktop.peek()) return;

    if (type === cursorType.peek()) return;

    cursorHistoryType.value = cursorType.peek();
    cursorType.value = type;
  };

  const showCsCursor = (type: CursorType): void => {
    setCursorType(type);
  };

  const hideCsCursor = (): void => {
    setCursorType(CursorType.DEFAULT);
  };

  useSignalEffect(() => {
    if (!isDesktop.value) return;
    const mx = gsap.quickTo(cursorPositionX, 'value', {
      duration: 0.5,
      ease: 'power3',
    });

    const my = gsap.quickTo(cursorPositionY, 'value', {
      duration: 0.5,
      ease: 'power3',
    });

    requestAnimationFrame(() => {
      // eslint-disable-next-line react-compiler/react-compiler
      cursorPositionX.value = window.innerWidth / 2;
      cursorPositionY.value = window.innerHeight / 2;
    });

    const onMouseMove = (e: MouseEvent): void => {
      mx(e.clientX);
      my(e.clientY);

      clientX.value = e.clientX;
      clientY.value = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    return (): void => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  });

  const value = useMemo(
    () => ({
      cursorType,
      cursorHistoryType,
      setCursorType,
      cursorPositionX,
      cursorPositionY,
      showCsCursor,
      hideCsCursor,
      clientX,
      clientY,
    }),
    [
      cursorType,
      cursorHistoryType,
      setCursorType,
      cursorPositionX,
      cursorPositionY,
      showCsCursor,
      hideCsCursor,
      clientX,
      clientY,
    ]
  );

  return <CursorContext value={value}>{children}</CursorContext>;
}
