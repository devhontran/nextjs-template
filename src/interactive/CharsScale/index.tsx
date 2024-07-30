'use client';

import { MathMap } from '@Utils/mathUtils';
import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
} from 'react';
import SplitType from 'split-type';

import s from './styles.module.scss';

export default function InteractiveCharsScale({ children }: PropsWithChildren): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!refContent.current) return;

    refContent.current.classList.add(s.InteractiveCharsScale);
    const pt = new SplitType(refContent.current, { types: ['words', 'chars'] });

    pt.chars?.forEach((char, idx) => {
      const span = document.createElement('span');
      const pa = char.parentElement;
      if (!pa) return;

      span.appendChild(char);
      pa.appendChild(span);

      span.addEventListener('mouseenter', () => {
        pt.chars?.forEach((cc, iidx) => {
          const distance = Math.abs(iidx - idx);
          const scale = MathMap(distance, 0, 3, 2, 1);
          cc.style.setProperty('--scale', `${Math.max(scale, 1)}`);
        });
      });
    });

    refContent.current.addEventListener('mouseleave', () => {
      pt.chars?.forEach((cc) => {
        cc.style.setProperty('--scale', `1`);
      });
    });
  }, []);

  if (!isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return cloneElement(children, { ...{ ref: refContent } });
}
