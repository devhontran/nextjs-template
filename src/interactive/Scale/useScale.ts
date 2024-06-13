import { useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import { MutableRefObject } from 'react';

import useWindowResize from '@/hooks/useWindowResize';
import { IAnimationElement } from '@/types/common';

interface IUseScale {
  refContent: MutableRefObject<IAnimationElement | null>;
  duration?: number;
  opacityTo?: number;
  opacityFrom?: number;
  opacityActive?: boolean;
  scaleTo: number;
  scaleFrom: number;
}
interface SelfType {
  progress: number;
}
export default function useScale({ refContent, scaleFrom, scaleTo }: IUseScale): void {
  const { isMobile } = useWindowResize();
  useSignalEffect(() => {
    if (!refContent.current || isMobile.value) return;

    // Set initial scale
    gsap.set(refContent.current, { opacity: 1, scale: scaleFrom });

    // Apply scaling animation on scroll
    const parent = refContent.current.parentElement;
    const options = {
      scrollTrigger: {
        scrub: true,
        trigger: parent,
        // markers: true,
        start: 'top 86%',
        end: 'bottom 10%',
        onUpdate: (self: SelfType): void => {
          const currentContent = refContent.current;
          if (currentContent) {
            let progressFormat;
            if (self.progress <= 0.35) {
              progressFormat = lerp(scaleFrom, scaleTo, self.progress / 0.35); // Transition from 0.5 to 1
            } else if (self.progress <= 0.85) {
              progressFormat = scaleTo; // Stay at 1
            } else {
              progressFormat = lerp(scaleTo, scaleFrom, (self.progress - 0.85) / 0.15); // Transition from 1 to 0.5
            }
            currentContent.style.transform = `scale(${progressFormat})`;
          }
        },
      },
    };

    gsap.to(refContent.current, options);

    return () => {
      gsap.killTweensOf(refContent.current);
    };
  });
}

// Assuming you have defined lerp function elsewhere
const lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t;
};
