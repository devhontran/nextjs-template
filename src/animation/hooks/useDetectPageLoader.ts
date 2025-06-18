'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

import { TIMEOUT_UNREGISTER_ASSETS } from '@/constants/animation';

import { useAssetsContext } from '../contexts/AssetsContext';

export const useDetectPageLoader = (): void => {
  const { registerAssets, unRegisterAssets, resetAssets } = useAssetsContext();
  const pathName = usePathname();

  useLayoutEffect(() => {
    registerAssets();
    const time = setTimeout(unRegisterAssets, TIMEOUT_UNREGISTER_ASSETS);
    return (): void => {
      clearTimeout(time);
      resetAssets();
    };
  }, [pathName]);
};
