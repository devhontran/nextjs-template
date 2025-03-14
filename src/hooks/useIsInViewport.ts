'use client';

import type { Signal } from '@preact/signals-react';
import { useSignal } from '@preact/signals-react';
import type { RefObject } from 'react';
import { useLayoutEffect, useRef } from 'react';

export function useIsInViewport({
  ref,
  options,
}: {
  ref: RefObject<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | HTMLVideoElement | null>;
  options?: IntersectionObserverInit;
}): { visible: Signal<boolean>; kill: () => void } {
  const visible = useSignal<boolean>(false);
  const tntersectionObserver = useRef<IntersectionObserver>(null);

  useLayoutEffect(() => {
    tntersectionObserver.current = new IntersectionObserver(
      ([entry]) => {
        // eslint-disable-next-line react-compiler/react-compiler
        visible.value = entry.isIntersecting;
      },
      {
        ...{ threshold: 0, rootMargin: '0px 0px 0px 0px' },
        ...options,
      }
    );

    if (ref.current) {
      tntersectionObserver.current.observe(ref.current);
    }
    return kill;
  }, []);

  const kill = (): void => {
    if (ref.current) {
      tntersectionObserver.current?.unobserve(ref.current);
      tntersectionObserver.current?.disconnect();
    }
  };

  return { visible, kill };
}
