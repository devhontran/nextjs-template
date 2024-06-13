import { Signal, useSignal } from '@preact/signals-react';
import { MutableRefObject, useEffect, useRef } from 'react';

export function useIsInViewport({
  ref,
  options,
}: {
  ref: MutableRefObject<
    HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | HTMLVideoElement | null
  >;
  options?: IntersectionObserverInit;
}): { visible: Signal<boolean>; kill: () => void } {
  const visible = useSignal<boolean>(false);
  const refobserver = useRef<IntersectionObserver>();

  useEffect(() => {
    refobserver.current = new IntersectionObserver(
      ([entry]) => {
        visible.value = entry.isIntersecting;
      },
      {
        ...{ threshold: 0, rootMargin: '0px 0px 0px 0px' },
        ...options,
      }
    );

    ref.current && refobserver.current?.observe(ref.current);
    return kill;
  }, []);

  const kill = (): void => {
    ref?.current && refobserver.current?.unobserve(ref.current);
    refobserver.current?.disconnect();
  };

  return { visible, kill };
}
