export interface IAnimationHook {
  delayEnter?: number;
  delayTrigger?: number;
  duration?: number;
  ease?: string;
  horizontal?: boolean;
}

export interface IAnimationProps extends IAnimationHook {
  threshold?: number;
  start?: string;
  isObserver?: boolean;
  playAnimationTrigger?: boolean;
  markers?: boolean;
  isInPopup?: boolean;
}

export interface IValueHookAnimation {
  initAnimation: () => void;
  playAnimation: (d?: number) => void;
}
