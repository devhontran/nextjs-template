import useWindowResize from '@Hooks/useWindowResize';
import { useSignalEffect } from '@preact/signals-react';
import { MathMap } from '@Utils/mathUtils';
import { useLenis } from 'lenis/react';
import { PropsWithChildren, ReactElement, useRef } from 'react';

import { PageStatus, pageStatus } from '@/animation/usePageStatus';

import s from './styles.module.scss';

interface IImageParallaxProps extends PropsWithChildren {
  speed: number;
}

export default function MotionParallaxBox({ speed, children }: IImageParallaxProps): ReactElement {
  const refWrap = useRef<HTMLDivElement>(null);
  const refInner = useRef<HTMLDivElement>(null);
  const refRect = useRef<{ rect: DOMRect; wHeight: number }>({ rect: {} as DOMRect, wHeight: 0 });

  const { height } = useWindowResize();

  useSignalEffect(() => {
    const wHeight = height.value;
    const isEnter = pageStatus.value === PageStatus.PAGE_ENTER;
    if (!refWrap.current || !isEnter) return;
    const rect = refWrap.current.getBoundingClientRect();
    const scroll = window.lenis?.lenis?.scroll || 0;
    refRect.current = {
      rect: {
        top: rect.top + scroll,
        bottom: rect.bottom + scroll,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,
      } as DOMRect,
      wHeight: wHeight,
    };
  });

  useLenis(({ scroll }) => {
    const wHeight = refRect.current.wHeight;
    const center = refRect.current.rect.top - scroll + refRect.current.rect.height / 2;

    const yTran = MathMap(center, wHeight, wHeight / 2, wHeight, 0);
    if (refInner.current)
      refInner.current.style.transform = `translate3d(0, ${yTran * speed}px, 0)`;
  });

  return (
    <div ref={refWrap} className={s.parallaxBox}>
      <div ref={refInner} className={s.parallaxBox_inner}>
        {children}
      </div>
    </div>
  );
}
