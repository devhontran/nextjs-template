import { TIME_WAIT_LOADED_TRIGGER } from '@Constants/animation';
import { useGSAP } from '@gsap/react';
import { usePageEnter, usePageForeEnter } from '@Layouts/Animation/usePageStatus';
import { MathMap } from '@Utils/mathUtils';
import { pageScrollTop } from '@Utils/uiHelper';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MutableRefObject, useRef } from 'react';

import { IAnimationProps, IValueHookAnimation } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface IProps extends IValueHookAnimation, IAnimationProps {
  trigger: MutableRefObject<IAnimationElement | null>;
}

export default function useAnimation({
  trigger,
  animationIn,
                                       animationRevert,
                                       needUpdate,
  isObserver,
  threshold,
  start,
  markers,
  delayEnter,
  delayTrigger,
}: IProps): void {
  const refObserver = useRef<IntersectionObserver | null>(null);
  const refGsapTl = useRef<ScrollTrigger | null>(null);

  const getDelay = (): number => {
    if (!trigger.current) return 0;
    if (pageScrollTop() > 10) {
      return delayTrigger || 0;
    }
    return (delayEnter || 0) + TIME_WAIT_LOADED_TRIGGER;
  };

  const { contextSafe } = useGSAP(() => {});

  const addTriggerScroller = contextSafe(() => {
    let calcTheshold = threshold || 0;
    if (calcTheshold === 0 && trigger.current) {
      const { height, top } = trigger.current.getBoundingClientRect();
      if (top >= window.innerHeight) {
        calcTheshold = MathMap(height / window.innerHeight, 0, 100, 30, 0);
        calcTheshold = Math.max(Math.min(calcTheshold, 30), 0);
      }
    }

    const delay = getDelay();

    console.log('____trigger.current', trigger.current);

    // if (!isObserver) {
      ScrollTrigger.create({
        trigger: trigger.current,
        onToggle: (self) => self.isActive ? animationIn(delay) : animationRevert(),
        start: start || `top+=${calcTheshold}% bottom`,
        once: true,
        markers,
      });
    // } else {
    //   refObserver.current = new IntersectionObserver(
    //     (entries) => {
    //       if (entries[0].isIntersecting) {
    //         playAnimation(delay);
    //         trigger.current && refObserver.current?.unobserve(trigger.current);
    //         refObserver.current?.disconnect();
    //       }
    //     },
    //     { threshold: calcTheshold / 100 }
    //   );
    //   trigger.current && refObserver.current?.observe(trigger.current);
    // }
  });

  usePageForeEnter(() => {
    addTriggerScroller();
    return () => {
      if (isObserver) {
        trigger.current && refObserver.current?.unobserve(trigger.current);
        refObserver.current?.disconnect();
      } else if (refGsapTl.current) {
        refGsapTl.current.kill();
      }
    };
  });
}
