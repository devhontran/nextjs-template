'use client';

import { TIME_WAIT_LOADED_TRIGGER } from '@Constants/animation';
import { MathMap } from '@Utils/mathUtils';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { getImageProps } from 'next/image';

import type { IImageGenerative } from '@/types/image';

export const pageScrollTop = (): number => {
  return window.pageYOffset || document.documentElement.scrollTop || 0;
};

export const isSafariChecked = (): boolean => {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
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

export const getDelay = ({
  element,
  delayTrigger,
  delayEnter,
}: {
  element: IAnimationElement;
  delayTrigger?: number;
  delayEnter?: number;
}): number => {
  if (!element) return 0;
  const rect = element.getBoundingClientRect();
  if (rect.top <= window.innerHeight && rect.top >= 0) {
    return (delayEnter || 0) + TIME_WAIT_LOADED_TRIGGER / 1000;
  }
  return delayTrigger || 0;
};

export const calcThreshold = ({
  element,
  threshold,
}: {
  element: HTMLElement;
  threshold?: number;
}): number => {
  let inputThreshold = threshold || 0;
  if (inputThreshold === 0 && element) {
    const { height, top } = element.getBoundingClientRect();
    if (top >= window.innerHeight) {
      inputThreshold = MathMap(height / window.innerHeight, 0, 100, 30, 0);
      inputThreshold = Math.max(Math.min(inputThreshold, 30), 0);
    }
  }
  return inputThreshold;
};

export function shuffle(array: (string | number | HTMLElement)[]): void {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

export const splitAnimate = (refContent: HTMLElement, callback: () => void): void => {
  const rect = refContent.getBoundingClientRect();
  refContent.style.visibility = 'hidden';
  if (rect) {
    const delay = (rect.top / window.innerHeight) * 100;
    setTimeout(
      () => {
        callback();
        refContent.style.visibility = 'visible';
      },
      Math.max(0, Math.min(delay, 2000))
    );
  }
};
