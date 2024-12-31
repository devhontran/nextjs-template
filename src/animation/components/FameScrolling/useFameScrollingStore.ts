import { signal, useSignal, useSignalEffect } from '@preact/signals-react';
import { MathMap } from '@Utils/mathUtils';
import { gsap } from 'gsap';
import { useRef } from 'react';

export const fameCurrent = signal<number>(0);

export default function useAnimationOnFame({
  refContent,
  fameIns,
  fameOuts,
}: {
  refContent: React.RefObject<HTMLDivElement>;
  fameIns: number[];
  fameOuts: number[];
}): void {
  useSignalEffect(() => {
    const fame = fameCurrent.value;
    if (fame <= fameIns[1]) {
      const opacity = MathMap(fame, fameIns[0], fameIns[1], 0, 1);
      const y = MathMap(fame, fameIns[0], fameIns[1], 100, 0);
      if (refContent.current) {
        refContent.current.style.transform = `translateY(${y}%)`;
        refContent.current.style.opacity = `${opacity}`;
      }
    } else if (fame >= fameOuts[0]) {
      const opacity = MathMap(fame, fameOuts[0], fameOuts[1], 1, 0);
      const y = MathMap(fame, fameOuts[0], fameOuts[1], 0, -100);
      if (refContent.current) {
        refContent.current.style.transform = `translateY(${Math.max(y, -100)}%)`;
        refContent.current.style.opacity = `${Math.max(opacity, 0)}`;
      }
    }
  });
}

export function useAnimationTriggerFrame(
  refContent: React.RefObject<HTMLDivElement>,
  frameStart: number,
  frameEnd: number
): void {
  const isAnimationIn = useRef<boolean>(false);
  const isAnimationOut = useRef<boolean>(false);
  const poFame = useSignal<number>(0);

  useSignalEffect(() => {
    const frame = poFame.value;
    if (frame >= frameStart && frame < frameEnd) {
      if (!isAnimationIn.current) {
        isAnimationIn.current = true;
        isAnimationOut.current = false;
        gsap.to(refContent.current, { opacity: 1, ease: 'power3.inOut', duration: 0.8 });
      }
    } else if (!isAnimationOut.current) {
      isAnimationOut.current = true;
      isAnimationIn.current = false;
      gsap.to(refContent.current, { opacity: 0, ease: 'power3.inOut', duration: 0.8 });
    }
  });
}
