import { motionEnabled, useMotionEnabled } from '@Motions/useMotionStore';
import { calcThreshold, getDelay } from '@Utils/uiHelper';

import { usePlayPage } from '@/layouts/Animation/usePageStatus';
import { IAnimationProps } from '@/types/animation';

interface IMotionProps {
  refContent: React.RefObject<IAnimationElement>;
  motionPlay: (tween: gsap.TweenVars) => void;
  motionInit: () => void;
  motionRevert?: () => void;
  motion?: IAnimationProps;
}

export default function useMotion({
  refContent,
  motionPlay,
  motion,
  motionRevert,
  motionInit,
}: IMotionProps): void {
  const animationIn = (): void => {
    const delay = getDelay({
      element: refContent.current as HTMLElement,
      delayEnter: motion?.delayEnter,
      delayTrigger: motion?.delayTrigger,
    });

    const topStart = calcThreshold({
      element: refContent.current as HTMLElement,
      threshold: motion?.threshold,
    });

    motionPlay({
      scrollTrigger: {
        trigger: refContent.current,
        start: motion?.start || `top+=${topStart}% bottom`,
        onToggle: (self) => {
          !self.isActive && refContent.current?.classList.add('animated');
        },
        once: true,
        markers: motion?.markers,
      },
      delay,
    });
  };

  usePlayPage(() => {
    motionEnabled.peek() && animationIn();
    return motionRevert;
  });

  useMotionEnabled(motionInit);
}
