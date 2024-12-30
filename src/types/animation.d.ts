import { Signal } from '@preact/signals-react';

export interface IAnimationHook {
  delayEnter?: number;
  delayTrigger?: number;
  duration?: number;
  ease?: string;
}

export interface IAnimationProps extends IAnimationHook {
  start?: string;
  threshold?: number;
  isObserver?: boolean;
  markers?: boolean;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
}

export interface IValueHookAnimation {
  animationRevert: () => void;
  animationIn: (d?: number) => void;
  needUpdate?: Signal<number>;
}

interface IAnimationHookReturn extends IValueHookAnimation {
  animationOut?: (d?: number) => void;
}
