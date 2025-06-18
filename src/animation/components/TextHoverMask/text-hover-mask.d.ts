interface TextHoverMaskRef {
  onHover: (twVars?: gsap.TweenVars) => void;
  motionIn: (twVars?: gsap.TweenVars) => void;
  motionOut: (twVars?: gsap.TweenVars) => void;
}

interface TextHoverMaskProps {
  ref: React.RefObject<TextHoverMaskRef | null>;
  children: React.ReactNode;
  isMotionTrigger?: boolean;
}
