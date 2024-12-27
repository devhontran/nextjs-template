'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { resetPreloader } from '@/animation/signals/preloaderSignals';

export default function PageReset(): React.ReactElement | null {
  const pathName = usePathname();

  useEffect(() => {
    resetPreloader();
  }, [pathName]);

  return null;
}
