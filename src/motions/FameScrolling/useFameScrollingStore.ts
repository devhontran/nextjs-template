import { signal, useSignalEffect } from '@preact/signals-react';
import { MathMap } from '@Utils/mathUtils';

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
