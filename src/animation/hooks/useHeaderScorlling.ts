import { useGSAP } from '@gsap/react';
import { useSignal } from '@preact/signals-react';
import gsap from 'gsap';
import { useRef } from 'react';

import useWinResize from '@/hooks/useWinResize';

export const useHeaderScroller = ({
  refHeader,
}: {
  refHeader: React.RefObject<HTMLDivElement | null>;
}): void => {
  const previousScroll = useRef(0);
  const isHidden = useSignal(false);
  const { width } = useWinResize();

  useGSAP(
    () => {
      const rect = refHeader.current?.getBoundingClientRect();

      const handleScroll = (): void => {
        if (!rect) return;

        const currentScroll = window.scrollY;
        const delta = currentScroll - previousScroll.current;

        if (delta > 0 && Math.abs(currentScroll) > rect.height) {
          if (!isHidden.value) {
            gsap.to(refHeader.current, {
              yPercent: -100,
              duration: 0.8,
              ease: 'power3.Out',
              overwrite: 'auto',
            });

            isHidden.value = true; // eslint-disable-line react-compiler/react-compiler
          }
        } else {
          if (isHidden.value) {
            gsap.to(refHeader.current, {
              yPercent: 0,
              duration: 0.8,
              ease: 'power3.Out',
              overwrite: 'auto',
            });
            isHidden.value = false;
          }
        }

        previousScroll.current = currentScroll;
      };

      window.addEventListener('scroll', handleScroll);

      return (): void => {
        window.removeEventListener('scroll', handleScroll);
      };
    },
    { dependencies: [width] }
  );
};
