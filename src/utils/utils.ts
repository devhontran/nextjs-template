import { NEXT_PUBLIC_APP_ENV } from '@Constants/common';

import { pathNameState } from '@/layouts/Animation/usePageStatus';

export function isProduction(): boolean {
  return NEXT_PUBLIC_APP_ENV === 'production';
}

export function isWorkDetailPage(pathName: string): boolean {
  return /^\/commercial\/[^/]+$/.test(pathName);
}

export const isEffectWork = (): boolean => {
  return pathNameState.peek().typeEffect === 'work';
};

export const isEffectNext = (): boolean => {
  return pathNameState.peek().typeEffect === 'next';
};

export const isNormalPage = (): boolean => {
  return !isEffectWork() && !isEffectNext();
};
