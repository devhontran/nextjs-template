import { batch, signal, useSignalEffect } from '@preact/signals-react';

import { isEffectWork, isNormalPage, isWorkDetailPage } from '@/utils/utils';

import { useIsLoaded } from './usePreloader';
('use client');

const pathname =
  typeof window !== 'undefined' ? window.location.pathname.split('/')[1] || '/' : 'Home';
const pageName = pathname === '/' ? 'Home' : pathname;

export const pathNameState = signal<ILinkEffect>({
  pathName: pathname,
  pageName: pageName,
  typeEffect: 'page',
});

export const isPageOnceState = signal<boolean>(true);
export const isBodyReadyState = signal<boolean>(false);
export const isInitPageState = signal<boolean>(true);
export const isPlayPageState = signal<boolean>(false);
export const isLeavePageState = signal<boolean>(false);
export const isPageEnterState = signal<boolean>(false);
export const isTransitionPageIn = signal<boolean>(false);

export function initPage(toggle: boolean = true): void {
  isInitPageState.value = toggle;
  batch(() => {
    isPlayPageState.value = false;
    isPageEnterState.value = false;
    isLeavePageState.value = false;
  });
}

export function useInitPage(callback: () => void): void {
  useSignalEffect(() => {
    isInitPageState.value && callback();
  });
}

export function isPagePlay(): boolean {
  return isPlayPageState.peek();
}

export function playPage(toggle: boolean = true): void {
  isPlayPageState.value = toggle;
  if (toggle) {
    isTransitionPageIn.value = false;
  }
}

export function usePlayPage(callback: () => void, isOne: boolean = false): void {
  useSignalEffect(() => {
    isPlayPageState.value && ((isOne && isPageOnce()) || !isOne) && callback();
  });
}

export function usePlayPageOne(callback: () => void): void {
  useSignalEffect(() => {
    isPlayPageState.value && isPageOnce() && callback();
  });
}

export function isPageLeave(): boolean {
  return isLeavePageState.peek();
}

export function leavePage(toggle: boolean = true): void {
  isLeavePageState.value = toggle;
}

export function usePageLeave(callback: () => void): void {
  useSignalEffect(() => {
    isLeavePageState.value && callback();
  });
}

export function pageEnter(): void {
  isPageEnterState.value = true;
  isPageOnceState.value = false;
}

export function usePageEnter(callback: () => void): void {
  useSignalEffect(() => {
    isPageEnterState.value && callback();
  });
}

export function isPageEnter(): boolean {
  return isPageEnterState.peek();
}

export function isBodyReady(): boolean {
  return isBodyReadyState.peek();
}

export function isPageOnce(): boolean {
  return isPageOnceState.peek();
}

export function pageTransition({ pathName, pageName, typeEffect }: ILinkEffect): void {
  pathNameState.value = {
    pathName: pathName,
    pageName: pageName || 'Home',
    typeEffect: typeEffect || 'page',
  };
  isTransitionPageIn.value = true;
}

export function useTransitionIn(callback: () => void): void {
  useSignalEffect(() => {
    pathNameState.value && isPageEnter() && isNormalPage() && callback();
  });
}

export function useTransitionOut(callback: () => void): void {
  useIsLoaded(() => isNormalPage() && isTransitionPageIn.peek() && callback());
}

export function useTransitionInWork(callback: () => void): void {
  useSignalEffect(() => {
    if (pathNameState.value && isPageEnter() && isEffectWork()) {
      callback();
    }
  });
}

export function useTransitionOutWork(callback: () => void): void {
  useIsLoaded(() => {
    if (isTransitionPageIn.value && isEffectWork()) callback();
  });
}

export function useTransitionInWorkNext(callback: () => void): void {
  useSignalEffect(() => {
    if (pathNameState.value && isPageEnter() && isWorkDetailPage(pathNameState.peek().pathName)) {
      callback();
    }
  });
}

export function useTransitionOutWorkNext(callback: () => void): void {
  useIsLoaded(() => {
    if (isTransitionPageIn.value && isWorkDetailPage(pathNameState.peek().pathName)) callback();
  });
}
