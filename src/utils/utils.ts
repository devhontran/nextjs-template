import { NEXT_PUBLIC_APP_ENV } from '@Constants/common';

export function isProduction(): boolean {
  return NEXT_PUBLIC_APP_ENV === 'production';
}
