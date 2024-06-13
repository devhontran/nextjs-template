import { pageScrollTop } from '@Utils/uiHelper';
import { useEffect, useRef } from 'react';

const useIntersectionObserver = ({
  onEnterView,
  onLeaveView,
  onEnterBackView,
  onLeaveBackView,
  threshold = 0,
  margin,
}: {
  onEnterView?: (element: Element) => void;
  onLeaveView?: (element: Element) => void;
  onEnterBackView?: (element: Element) => void;
  onLeaveBackView?: (element: Element) => void;
  threshold?: number;
  margin?: string;
}): ((el: Element) => void) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const refDirection = useRef<'down' | 'up'>('down');
  const isEnter = useRef<boolean>(false);

  useEffect(() => {
    let scorllOld = 0;

    const onScroll = (): void => {
      const top = pageScrollTop();
      if (scorllOld < top) {
        refDirection.current = 'down';
      } else {
        refDirection.current = 'up';
      }
      scorllOld = top;
    };
    window.addEventListener('scroll', onScroll);
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isEnter.current = true;
            if (refDirection.current === 'down') {
              onEnterView && onEnterView(entry.target);
            } else {
              onEnterBackView && onEnterBackView(entry.target);
            }
          } else if (isEnter.current) {
            isEnter.current = false;
            if (refDirection.current === 'down') {
              onLeaveView && onLeaveView(entry.target);
            } else {
              onLeaveBackView && onLeaveBackView(entry.target);
            }
          }
        });
      },
      { threshold, rootMargin: margin || '' }
    );

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.current?.disconnect();
    };
  }, [onEnterView, onLeaveView, onEnterBackView, onLeaveBackView]);

  const observe = (element: Element | null): void => {
    if (element) {
      observer.current?.observe(element);
    }
  };

  return observe;
};

export default useIntersectionObserver;
