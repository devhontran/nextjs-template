import { signal, useSignalEffect } from '@preact/signals-react';

export enum PageStatus {
  PAGE_ONCE = 'PAGE_ONCE',
  PAGE_REPLACE = 'PAGE_REPLACE',
  PAGE_BEFORE_ENTER = 'PAGE_BEFORE_ENTER',
  PAGE_ENTER = 'PAGE_ENTER',
  PAGE_BEFORE_LEAVE = 'PAGE_BEFORE_LEAVE',
  PAGE_LEAVE = 'PAGE_LEAVE',
}

export const pageStatus = signal<PageStatus>(PageStatus.PAGE_ONCE);

export function pageBeforeEnter(): void {
  pageStatus.value = PageStatus.PAGE_BEFORE_ENTER;
}

export function pageEnter(): void {
  pageStatus.value = PageStatus.PAGE_ENTER;
}

export function pageReplace(): void {
  pageStatus.value = PageStatus.PAGE_REPLACE;
}

export function pageLeave(): void {
  pageStatus.value = PageStatus.PAGE_LEAVE;
}

export function pageBeforeLeave(): void {
  pageStatus.value = PageStatus.PAGE_BEFORE_LEAVE;
}

export function usePageForeEnter(callback: () => void): void {
  return useSignalEffect(() => {
    pageStatus.value === PageStatus.PAGE_BEFORE_ENTER && callback();
  });
}

export function usePageEnter(callback: () => void): void {
  return useSignalEffect(() => {
    // console.log('____pageStatus.value', pageStatus.value);
    pageStatus.value === PageStatus.PAGE_ENTER && callback();
  });
}

export function usePageBeforeLeave(callback: () => void): void {
  return useSignalEffect(() => {
    pageStatus.value === PageStatus.PAGE_BEFORE_LEAVE && callback();
  });
}

export function usePageLeave(callback: () => void): void {
  return useSignalEffect(() => {
    pageStatus.value === PageStatus.PAGE_LEAVE && callback();
  });
}

export function isPageEnter(): boolean {
  return pageStatus.peek() === PageStatus.PAGE_ENTER;
}
