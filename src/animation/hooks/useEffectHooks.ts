import { useSignalEffect } from '@preact/signals-react';

import { PageState, useEffectContext } from '../contexts/EffectContext';
import { useIsAssetsLoaded } from './useIsAssetsLoaded';

export function usePageEnter(onEnter: () => void): void {
  const { pageStatus } = useEffectContext();
  useSignalEffect(() => {
    if (pageStatus.value === PageState.Enter) {
      onEnter();
    }
  });
}

export function usePageLeave(onLeave: () => void): void {
  const { pageStatus } = useEffectContext();
  useSignalEffect(() => {
    if (pageStatus.value === PageState.Leave) {
      onLeave();
    }
  });
}

export function usePagePlay(onPlay: () => void): void {
  const { pageStatus } = useEffectContext();
  useSignalEffect(() => {
    if (pageStatus.value === PageState.Play) {
      requestAnimationFrame(onPlay);
    }
  });
}

export function usePageIdle(onIdle: () => void): void {
  const { pageStatus } = useEffectContext();
  useSignalEffect(() => {
    if (pageStatus.value === PageState.Idle) {
      onIdle();
    }
  });
}

export function usePageEffect(callback: () => void): void {
  const { routerState } = useEffectContext();
  routerState.value && callback();
}

export function usePageEffectIn(callback: () => void): void {
  const { isPageIdle } = useEffectContext();
  usePageLeave(() => {
    !isPageIdle.peek() && callback();
  });
}

export function usePageEffectOut(callback: () => void): void {
  const { isPageIdle } = useEffectContext();
  useIsAssetsLoaded(() => {
    !isPageIdle.peek() && callback();
  });
}
