import { useSignalEffect } from '@preact/signals-react';

import { PageState } from '@/enum/common';

import { useEffectContext } from '../contexts/EffectContext';
import { useIsAssetsLoaded } from './useIsAssetsLoaded';

export function usePageEnter(onEnter: () => void): void {
  const { pageStatus } = useEffectContext();
  useSignalEffect(() => {
    if (pageStatus.value === PageState.ENTER) {
      onEnter();
    }
  });
}

export function usePageLeave(onLeave: () => void): void {
  const { pageStatus } = useEffectContext();
  useSignalEffect(() => {
    if (pageStatus.value === PageState.LEAVE) {
      onLeave();
    }
  });
}

export function usePagePlay(onPlay: () => void): void {
  const { pageStatus } = useEffectContext();
  useSignalEffect(() => {
    if (pageStatus.value === PageState.PLAY) {
      requestAnimationFrame(onPlay);
    }
  });
}

export function usePageIdle(onIdle: () => void): void {
  const { pageStatus } = useEffectContext();
  useSignalEffect(() => {
    if (pageStatus.value === PageState.IDLE) {
      onIdle();
    }
  });
}

export function usePageEffectIn(callback: () => void): void {
  const { isPageIdle } = useEffectContext();
  usePageLeave(() => {
    if (!isPageIdle.peek()) {
      callback();
    }
  });
}

export function usePageEffectOut(callback: () => void): void {
  const { isPageIdle } = useEffectContext();
  useIsAssetsLoaded(() => {
    if (!isPageIdle.peek()) {
      callback();
    }
  });
}

export function useAfterPageEnter(callback: (isReady: boolean) => void): void {
  const { pageStatus } = useEffectContext();
  useSignalEffect(() => {
    callback(pageStatus.peek() === PageState.ENTER);
  });
}

export function useIsPageEnter(): boolean {
  const { pageStatus } = useEffectContext();
  return pageStatus.peek() === PageState.ENTER;
}

export function useIsPageLeave(): boolean {
  const { pageStatus } = useEffectContext();
  return pageStatus.peek() === PageState.LEAVE;
}

export function useIsPagePlay(): boolean {
  const { pageStatus } = useEffectContext();
  return pageStatus.peek() === PageState.PLAY;
}

export function useIsPageIdle(): boolean {
  const { pageStatus } = useEffectContext();
  return pageStatus.peek() === PageState.IDLE;
}
