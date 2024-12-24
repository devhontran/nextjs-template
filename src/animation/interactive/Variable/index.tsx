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

export default function InteractiveVariable({ children }: PropsWithChildren): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!refContent.current) return;

    refContent.current.classList.add(s.interactiveVariable);
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
          const wght = MathMap(distance, 0, 3, 700, 300);
          const wdth = MathMap(distance, 0, 3, 110, 50);
          cc.style.setProperty('--wght', `${Math.max(wght, 300)}`);
          cc.style.setProperty('--wdth', `${Math.max(wdth, 50)}`);
        });
      });
    });

    refContent.current.addEventListener('mouseleave', () => {
      pt.chars?.forEach((cc) => {
        cc.style.setProperty('--wght', `300`);
        cc.style.setProperty('--wdth', `50`);
      });
    });
  }, []);

  if (!isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }

  return cloneElement(children, { ...{ ref: refContent } });
}
