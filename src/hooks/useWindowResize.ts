'use client';

import { Signal, useSignalEffect } from '@preact/signals-react';
import { useState } from 'react';

import { useAnimationContext } from '@/animation/contexts/AnimationContext';

interface IDimension {
  isMobile: Signal<boolean>;
  isDesktop: Signal<boolean>;
  isTablet: Signal<boolean>;
}

const createDeviceHook = (selector: (dimension: IDimension) => Signal<boolean>) => {
  return (): boolean => {
    const [is, setIs] = useState<boolean>(false);
    const dimension = useAnimationContext() as IDimension;

    useSignalEffect(() => {
      setIs(selector(dimension).value);
    });

    return is;
  };
};

export const useIsMobile = createDeviceHook((dimension) => dimension.isMobile);
export const useIsDesktop = createDeviceHook((dimension) => dimension.isDesktop);
export const useIsTablet = createDeviceHook((dimension) => dimension.isTablet);
