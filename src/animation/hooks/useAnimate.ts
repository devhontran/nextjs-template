import { calcThreshold, getDelay } from '@Utils/uiHelper';
import { useMemo } from 'react';

import { IAnimationProps } from '@/types/animation';

interface IMotionProps {
  refContent: React.RefObject<IAnimationElement>;
  motion?: IAnimationProps;
}

export default function useAnimate({ refContent, motion }: IMotionProps): gsap.TweenVars {
  const gsapWars = useMemo((): gsap.TweenVars => {
    const delay = getDelay({
      element: refContent.current as HTMLElement,
      delayEnter: motion?.delayEnter,
      delayTrigger: motion?.delayTrigger,
    });

    const topStart = calcThreshold({
      element: refContent.current as HTMLElement,
      threshold: motion?.threshold,
    });

    return {
      scrollTrigger: {
        trigger: refContent.current,
        start: motion?.start || `top+=${topStart}% bottom`,
        onToggle: (self): void => {
          !self.isActive && refContent.current?.classList.add('animated');
        },
        once: true,
        markers: motion?.markers,
      },
      delay,
    };
  }, [refContent, motion]);

  return gsapWars;
}
