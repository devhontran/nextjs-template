interface IRefVideoButton {
  active: () => void;
  deActive: () => void;
  activeMouseEnter: () => void;
  deActiveMouseEnter: () => void;
  motionIn: (twVars?: gsap.TweenVars) => void;
  motionOut: (twVars?: gsap.TweenVars) => void;
  getEl: () => HTMLButtonElement | null;
}

interface IRefMotion {
  motionIn: (twVars?: gsap.TweenVars) => void;
  motionOut: (twVars?: gsap.TweenVars) => void;
  motionReset?: (twVars?: gsap.TweenVars) => void;
}
