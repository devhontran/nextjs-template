interface IPropMotionInit {
  splitText: Promise<SplitText>;
}
interface IPropMotionPlay {
  splitText: Promise<SplitText>;
  tweenVars: gsap.TweenVars;
}

interface IMotionR {
  motionIn: (twVarsCustom?: gsap.TweenVars) => gsap.core.Tween | null;
  motionOut?: (twVarsCustom?: gsap.TweenVars) => void;
}

interface IMotionTypoFunctions extends IMotionR {
  motionInit: () => Promise<void>;
  textRevert?: () => void;
}

interface IMotionBaseFunctions extends IMotionR {
  motionInit: () => Promise<void>;
}
