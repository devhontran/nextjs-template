import { signal } from '@preact/signals-react';

export enum PageState {
  Enter = 'enter',
  Leave = 'leave',
  Idle = 'idle',
  Play = 'play',
}

export const pageState = signal<PageState>(PageState.Idle);
export const pageEffectState = {
  pathName: signal<string>('/'),
  pageName: signal<string>('Home'),
};

export const pageLeave = (): void => {
  pageState.value = PageState.Leave;
};

export const pageEnter = (): void => {
  pageState.value = PageState.Enter;
};

export const pagePlay = (): void => {
  pageState.value = PageState.Play;
};

export const pageIdle = (): void => {
  pageState.value = PageState.Idle;
};
