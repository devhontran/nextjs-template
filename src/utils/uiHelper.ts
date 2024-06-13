'use client';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { getImageProps } from 'next/image';

import { IAnimationElement } from '@/types/common';
import { IImageGenerative } from '@/types/image';

export const pageScrollTop = (): number => {
  return window.pageYOffset || document.documentElement.scrollTop || 0;
};

export const checkPageScrolled = (): boolean => {
  return pageScrollTop() > 10;
};

export const isSafariChecked = (): boolean => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

export const getDelay = ({
  refContentCurrent,
  delayEnter = 0,
  delayTrigger = 0,
}: {
  refContentCurrent: IAnimationElement | null;
  delayEnter?: number;
  delayTrigger?: number;
}): number => {
  if (!refContentCurrent) return 0;
  const { top } = refContentCurrent.getBoundingClientRect();
  if (top > window.innerHeight || checkPageScrolled()) {
    return delayTrigger;
  }
  return delayEnter;
};

export const getSpaceTrigger = (el: IAnimationElement | null): number => {
  const trigger = window.innerHeight / 5;
  if (!el) return trigger;

  const { height } = el.getBoundingClientRect();
  if (height < trigger) return height;
  return trigger;
};

//eslint-disable-next-line
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null;

  return function (...args: Parameters<T>): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export function bodyReady(): void {
  document.body.classList.add('is-ready');
}

export const gRefresh = (timeout = 1000): void => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, timeout);
};

export const easingScrolling = (x: number): number => {
  return 1 - Math.pow(1 - x, 4);
};

export const easingPining = (x: number): number => {
  return 1 - Math.pow(1 - x, 4);
};

export const easeInOutSine = (x: number): number => {
  return -(Math.cos(Math.PI * x) - 1) / 2;
};

export const easeOutCubic = (x: number): number => {
  return 1 - Math.pow(1 - x, 3);
};

export const easeInOutQuad = (x: number): number => {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
};

export function easeInQuart(x: number): number {
  return x * x * x * x;
}

export function easeOutQuad(x: number): number {
  return 1 - (1 - x) * (1 - x);
}

export function easeOutQuint(x: number): number {
  return 1 - Math.pow(1 - x, 5);
}

export function easeLenis(t: number): number {
  return Math.min(1, 1.001 - Math.pow(2, -10 * t));
}

export function pcSmall(): boolean {
  return typeof window !== 'undefined' && window.innerWidth >= 1200;
}

export function minTablet(): boolean {
  return typeof window !== 'undefined' && window.innerWidth >= 768;
}

export function isTabletScreen(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 1200 && window.innerWidth >= 768;
}

export function mobile(): boolean {
  return !minTablet();
}

export const isTouch = (): boolean => {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
};

export const isSafari = (): boolean => {
  const ua = (typeof window !== 'undefined' && navigator.userAgent.toLowerCase()) || '';
  return (
    ua.includes('safari') &&
    !ua.includes('chrome') &&
    !ua.includes('firefox') &&
    !ua.includes('edge') &&
    navigator.vendor === 'Apple Computer, Inc.'
  );
};

export const handleConvertSize = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): { w: number; h: number } => {
  if (width <= 2560) return { w: width, h: height };
  return {
    w: 2560,
    h: (2560 * height) / width,
  };
};

export const getTransitionThumbnail = ({
  url,
  src,
  width,
  height,
  quality,
  fill,
}: IImageGenerative): { src: string; srcSet?: string } => {
  const {
    props: { src: srcGenerate, srcSet },
  } = getImageProps({
    src: url || src || '',
    alt: 'img',
    width: !fill ? width : undefined,
    height: !fill ? height : undefined,
    fill,
    quality: quality,
  });
  return {
    src: srcGenerate,
    srcSet,
  };
};
