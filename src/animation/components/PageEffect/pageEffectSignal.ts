import { TIME_WAIT_PAGE_ENTER_TRANSITION } from '@Constants/animation';
import { usePreloader } from '@Layouts/Animation/usePreloader';
import { signal, useSignalEffect } from '@preact/signals-react';

import { pageBeforeEnter, PageStatus, pageStatus } from '@/Animation/usePageStatus';

export enum PageEffectStatus {
  IN = 'IN',
  INNED = 'INNED',
  OUT = 'OUT',
  OUTED = 'OUTED',
  ONCE = 'ONCE',
}

export const urlState = signal<string>('/');
export const pageEffectStatus = signal<PageEffectStatus>(PageEffectStatus.ONCE);

export function dispatchUrl(url: string): void {
  urlState.value = url;
}

export function dispatchUrlValue(): string {
  return urlState.peek();
}

export function pageEffectIn(): void {
  pageEffectStatus.value = PageEffectStatus.IN;
}

export function pageEffectInned(): void {
  pageEffectStatus.value = PageEffectStatus.INNED;
}

export function pageEffectOut(): void {
  pageEffectStatus.value = PageEffectStatus.OUT;
}

export function pageEffectOuted(): void {
  pageEffectStatus.value = PageEffectStatus.OUTED;
}

export function usePageEffectOut(callback: () => void): void {
  return useSignalEffect(() => {
    pageEffectStatus.value === PageEffectStatus.OUT && callback();
  });
}

export function usePageEffectOuted(callback: () => void): void {
  return useSignalEffect(() => {
    pageEffectStatus.value === PageEffectStatus.OUTED && callback();
  });
}

export function usePageEffectIn(callback: () => void): void {
  return useSignalEffect(() => {
    pageEffectStatus.value === PageEffectStatus.IN && callback();
  });
}

export function usePageEffectInned(callback: () => void): void {
  return useSignalEffect(() => {
    pageEffectStatus.value === PageEffectStatus.INNED && callback();
  });
}

export function useHandleLoaderInEffect(): void {
  const { progress } = usePreloader();
  return useSignalEffect(() => {
    progress.value >= 1 &&
      pageStatus.peek() === PageStatus.PAGE_REPLACE &&
      setTimeout(pageBeforeEnter, TIME_WAIT_PAGE_ENTER_TRANSITION);
  });
}
