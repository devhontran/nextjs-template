import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function useMaskCols({
  refContent,
  isInit = true,
}: {
  refContent: React.RefObject<HTMLDivElement | null>;
  isInit?: boolean;
}): { reset: () => void } & IMotionR {
  const { contextSafe } = useGSAP(() => {
    if (!refContent.current || !isInit) return;

    refContent.current.style.setProperty('--po', '0');
    refContent.current.style.setProperty('--direction', 'to right');
    refContent.current.style.setProperty('--initial-segment-size', '10rem');
    refContent.current.style.setProperty(
      '--segment-size',
      'calc(var(--po) * var(--initial-segment-size))'
    );
    refContent.current.style.setProperty(
      'mask-image',
      `repeating-linear-gradient(
    var(--direction),
    #000000,
    #000000 var(--segment-size),
    transparent var(--segment-size),
    transparent var(--initial-segment-size)
  )`
    );
  });
  const motionIn = contextSafe((twVarsCustom?: gsap.TweenVars): gsap.core.Tween | null => {
    if (!refContent.current) return null;
    return gsap.fromTo(
      refContent.current,
      {
        '--po': 0,
      },
      {
        '--po': 1,
        '--direction': 'to right',
        ease: 'power3.out',
        duration: 1.2,
        ...twVarsCustom,
      }
    );
  });

  const motionOut = contextSafe((twVarsCustom?: gsap.TweenVars): void => {
    if (!refContent.current) return;
    gsap.to(refContent.current, {
      '--po': 0,
      '--direction': 'to left',
      ease: 'power3.out',
      duration: 0.8,
      ...twVarsCustom,
    });
  });

  const reset = (): void => {
    if (!refContent.current) return;
    refContent.current.style.removeProperty('--po');
    refContent.current.style.removeProperty('--direction');
    refContent.current.style.removeProperty('--initial-segment-size');
    refContent.current.style.removeProperty('--segment-size');
    refContent.current.style.removeProperty('mask-image');
  };

  return {
    motionIn,
    reset,
    motionOut,
  };
}
