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
