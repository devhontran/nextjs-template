import { useSignalEffect } from '@preact/signals-react';

import { PageState, pageState, routerState } from '../signals/pageSignals';

export function usePageEnter(onEnter: () => void): void {
  useSignalEffect(() => {
    if (pageState.value === PageState.Enter) {
      onEnter();
    }
  });
}

export function usePageLeave(onLeave: () => void): void {
  useSignalEffect(() => {
    if (pageState.value === PageState.Leave) {
      onLeave();
    }
  });
}

export function usePagePlay(onPlay: () => void): void {
  useSignalEffect(() => {
    if (pageState.value === PageState.Play) {
      requestAnimationFrame(onPlay);
    }
  });
}

export function usePageIdle(onIdle: () => void): void {
  useSignalEffect(() => {
    if (pageState.value === PageState.Idle) {
      onIdle();
    }
  });
}

export function usePageEffect(callback: () => void): void {
  routerState.value && callback();
}
