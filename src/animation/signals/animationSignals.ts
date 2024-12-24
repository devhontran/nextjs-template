import { signal } from '@preact/signals-react';

export const pageTransitionState = signal<'enter' | 'leave' | 'idle'>('idle');

export const pageLeave = (): void => {
  pageTransitionState.value = 'leave';
};

export const pageEnter = (): void => {
  pageTransitionState.value = 'enter';
};

export const pageIdle = (): void => {
  pageTransitionState.value = 'idle';
};
