import { useIsInViewport } from '@Hooks/useIsInViewport';
import { useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import type { RefObject } from 'react';

interface IUseLoopInView {
  looper: () => void;
  refInView: RefObject<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | null>;
}
export const useLoopInView = ({ looper, refInView }: IUseLoopInView): { visible: boolean } => {
  const { visible } = useIsInViewport({ ref: refInView });

  useSignalEffect(() => {
    if (visible.value) {
      gsap.ticker.add(looper);
    } else {
      gsap.ticker.remove(looper);
    }

    return (): void => {
      gsap.ticker.remove(looper);
    };
  });

  return { visible: visible.value };
};
