import { signal } from '@preact/signals-react';

export const pageEffectState = {
  pathName: signal<string>('/'),
  pageName: signal<string>('Home'),
};
