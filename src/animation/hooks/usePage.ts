import { PageState, pageState } from '../signals/pageSignals';

export function usePageEnter(onEnter: () => void): void {
  if (pageState.value === PageState.Enter) {
    onEnter();
  }
}

export function usePageLeave(onLeave: () => void): void {
  if (pageState.value === PageState.Leave) {
    onLeave();
  }
}

export function usePagePlay(onPlay: () => void): void {
  if (pageState.value === PageState.Play) {
    onPlay();
  }
}

export function usePageIdle(onIdle: () => void): void {
  if (pageState.value === PageState.Idle) {
    onIdle();
  }
}
