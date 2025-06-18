import { NEXT_PUBLIC_APP_ENV } from '@/constants/common';

export function isProduction(): boolean {
  return NEXT_PUBLIC_APP_ENV === 'production';
}

export function isDevelopment(): boolean {
  return NEXT_PUBLIC_APP_ENV === 'development';
}

export const formatTime = (seconds: number): string =>
  [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':');
