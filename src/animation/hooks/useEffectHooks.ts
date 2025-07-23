import { useSignalEffect } from '@preact/signals-react';

import { PageState } from '@/enum/common';

import { useEffectContext } from '../contexts/EffectContext';
import { useIsAssetsLoaded } from './useIsAssetsLoaded';

export function usePageEnter(callback: () => void): void {
  const { isPageEnter } = useEffectContext();
  useSignalEffect(() => {
    if (isPageEnter.value) callback();
  });
}

export function usePageLeave(callback: () => void): void {
  const { isPageLeave } = useEffectContext();
  useSignalEffect(() => {
    if (isPageLeave.value) callback();
  });
}

export function usePagePlay(callback: () => void): void {
  const { isPagePlay } = useEffectContext();
  useSignalEffect(() => {
    if (isPagePlay.value) callback();
  });
}

export function usePageIdle(callback: () => void): void {
  const { isPageIdle } = useEffectContext();
  useSignalEffect(() => {
    if (isPageIdle.value) callback();
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
