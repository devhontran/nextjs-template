'use client';

import { useGSAP } from '@gsap/react';
import { useSignal, useSignalEffect } from '@preact/signals-react';
import gsap from 'gsap';
import { type RefObject, useRef } from 'react';

import { useCursorContext } from '@/animation/contexts/CursorContext';
import { useUiContext } from '@/animation/contexts/UiContext';
import { useIsInViewport } from '@/hooks/useIsInViewport';
import { NumberFixed } from '@/utils/utils';

import style from './CardLight.module.scss';

interface IUseCardLightProps {
  refContent: RefObject<HTMLDivElement | HTMLAnchorElement | null>;
  refParallax?: RefObject<HTMLDivElement | null>;
  deep?: number;
  brightness?: number;
  contrast?: number;
  opacity?: number;
  size?: number;
  isIgnoreGlowEffect?: boolean;
}
export const useCardLight = ({
  refContent,
  refParallax,
  // deep = 1,
  brightness = 0.45,
  contrast = 1,
  opacity = 1,
  size = 50,
  isIgnoreGlowEffect = false,
}: IUseCardLightProps): void => {
  const { cursorPositionX, cursorPositionY, setIsGrowDeep } = useCursorContext();
  const { isDesktop } = useUiContext();
  const { visible } = useIsInViewport({ ref: refContent });
  const isHover = useSignal(false);

  const refQTo = useRef<{
    x: gsap.QuickToFunc | null;
    y: gsap.QuickToFunc | null;
  }>({
    x: null,
    y: null,
  });

  const refQToTilt = useRef<{
    x: gsap.QuickToFunc | null;
    y: gsap.QuickToFunc | null;
  }>({
    x: null,
    y: null,
  });

  useGSAP(
    () => {
      if (isIgnoreGlowEffect) return;

      refContent.current?.classList.add(style.card);
      refContent.current?.style.setProperty(
        '--filter',
        `brightness(${brightness}) contrast(${contrast})`
      );
      refContent.current?.style.setProperty('--opacity', `${opacity}`);
      refContent.current?.style.setProperty('--size', `${size}%`);

      if (!refParallax?.current) return;
      // refQTo.current.x = gsap.quickTo(refParallax.current, 'xPercent', {
      //   duration: 0.5,
      //   ease: 'power3',
      // });

      // refQTo.current.y = gsap.quickTo(refParallax.current, 'yPercent', {
      //   duration: 0.5,
      //   ease: 'power3',
      // });

      refQToTilt.current.x = gsap.quickTo(refContent.current, '--tilt-x', {
        duration: 0.5,
        ease: 'power3',
      });
      refQToTilt.current.y = gsap.quickTo(refContent.current, '--tilt-y', {
        duration: 0.5,
        ease: 'power3',
      });

      const onMouseEnter = (): void => {
        // eslint-disable-next-line react-compiler/react-compiler
        isHover.value = true;
        setIsGrowDeep(true);
      };

      const onMouseLeave = (): void => {
        isHover.value = false;
        setIsGrowDeep(false);
      };

      refContent.current?.addEventListener('mouseenter', onMouseEnter);
      refContent.current?.addEventListener('mouseleave', onMouseLeave);

      return (): void => {
        refContent.current?.removeEventListener('mouseenter', onMouseEnter);
        refContent.current?.removeEventListener('mouseleave', onMouseLeave);
      };
    },
    { dependencies: [isIgnoreGlowEffect] }
  );

  useSignalEffect(() => {
    const x = cursorPositionX.value;
    const y = cursorPositionY.value;
    if (!visible.value || !isDesktop.value || isIgnoreGlowEffect) return;

    const bounds = refContent.current?.getBoundingClientRect();
    if (!bounds) return;

    const posX = x - bounds.x;
    const posY = y - bounds.y;
    const ratioX = posX / bounds.width;
    const ratioY = posY / bounds.height;

    if (isHover.value && refContent.current?.getAttribute('is-expand') !== 'true') {
      // refQTo.current.x?.(NumberFixed((ratioX - 0.5) * (2.5 * deep), 2));
      // refQTo.current.y?.(NumberFixed((ratioY - 0.5) * (2.5 * deep), 2));
      refQToTilt.current.x?.(NumberFixed(ratioX, 2));
      refQToTilt.current.y?.(NumberFixed(ratioY, 2));
    } else {
      refQTo.current.x?.(0);
      refQTo.current.y?.(0);
      refQToTilt.current.x?.(0.5);
      refQToTilt.current.y?.(0.5);
    }

    refContent.current?.style.setProperty('--ratio-x', NumberFixed(ratioX, 2).toString());
    refContent.current?.style.setProperty('--ratio-y', NumberFixed(ratioY, 2).toString());
  });
};
