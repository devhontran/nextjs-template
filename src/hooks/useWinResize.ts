'use client';

import { useEffect, useState } from 'react';

import { BREAKPOINT_MOBILE, BREAKPOINT_TABLET, TIME_DELAY_RESIZE } from '@/constants/animation';
import { debounce } from '@/utils/uiHelper';

const useWinResize = (): {
  width: number;
  height: number;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
} => {
  const [width, setWidth] = useState(window.innerWidth || 0);
  const [height, setHeight] = useState(window.innerHeight || 0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setWidth(width);
      setHeight(height);

      setIsMobile(width < BREAKPOINT_MOBILE);
      setIsTablet(width >= BREAKPOINT_MOBILE && width < BREAKPOINT_TABLET);
      setIsDesktop(width >= BREAKPOINT_TABLET);
    };

    // Set initial values
    handleResize();

    const debounceResize = debounce((): void => {
      handleResize();
    }, TIME_DELAY_RESIZE);

    window.addEventListener('resize', debounceResize);
    return (): void => {
      window.removeEventListener('resize', debounceResize);
    };
  }, []);

  return { width, height, isDesktop, isTablet, isMobile };
};

export default useWinResize;
