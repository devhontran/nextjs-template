'use client';

import { useLayoutEffect, useState } from 'react';

import { getWindowHeight, getWindowWidth } from '@/utils/uiHelper';

const useWinResize = (): {
  width: number;
  height: number;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
} => {
  const [width, setWidth] = useState(getWindowWidth);
  const [height, setHeight] = useState(getWindowHeight);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const handleResize = (): void => {
      const width = getWindowWidth();
      const height = getWindowHeight();

      setWidth(width);
      setHeight(height);

      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    // Set initial values
    handleResize();

    window.addEventListener('resize', handleResize);
    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { width, height, isDesktop, isTablet, isMobile };
};

export default useWinResize;
