import { signal } from '@preact/signals-react';

export enum PageState {
  Enter = 'enter',
  Leave = 'leave',
  Idle = 'idle',
  Play = 'play',
}

export const pageState = signal<PageState>(PageState.Idle);
export const routerState = signal<{
  pathName: string;
  pageName: string;
  typeEffect: string;
}>({
  pathName: '/',
  pageName: 'Home',
  typeEffect: 'fade',
});

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

export const isPageEnter = (): boolean => pageState.peek() === PageState.Enter;

export const isPageLeave = (): boolean => pageState.peek() === PageState.Leave;

export const isPagePlay = (): boolean => pageState.peek() === PageState.Play;

export const isPageIdle = (): boolean => pageState.peek() === PageState.Idle;
