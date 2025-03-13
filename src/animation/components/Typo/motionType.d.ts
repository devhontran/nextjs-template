import type SplitType from 'split-type';

interface IPropMotionInit {
  splitText: SplitType;
}
interface IPropMotionPlay {
  splitText: SplitType;
  tweenVars: gsap.TweenVars;
}

interface IMotionTypeFncs {
  motionInit: (ob: IPropMotionInit) => void;
  motionPlay: (ob: IPropMotionPlay) => void;
  motionRevert: () => void;
}
