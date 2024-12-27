import { NEXT_PUBLIC_APP_ENV } from '@Constants/common';

import { routerState } from '@/animation/signals/pageSignals';

export function isProduction(): boolean {
  return NEXT_PUBLIC_APP_ENV === 'production';
}

export function isWorkDetailPage(pathName: string): boolean {
  return /^\/commercial\/[^/]+$/.test(pathName);
}

export const isEffectWork = (): boolean => {
  return routerState.typeEffect?.peek() === 'work';
};

export const isEffectNext = (): boolean => {
  return routerState.typeEffect?.peek() === 'next';
};

export const isNormalPage = (): boolean => {
  return !isEffectWork() && !isEffectNext();
};
