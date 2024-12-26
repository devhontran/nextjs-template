import { signal } from '@preact/signals-react';

export const pageTransitionState = signal<'enter' | 'leave' | 'idle' | 'play'>('idle');

export const pageLeave = (): void => {
  pageTransitionState.value = 'leave';
};

export const pageEnter = (): void => {
  pageTransitionState.value = 'enter';
};

export const pagePlay = (): void => {
  pageTransitionState.value = 'play';
};

export const pageIdle = (): void => {
  pageTransitionState.value = 'idle';
};
