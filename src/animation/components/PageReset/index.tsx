'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import {
  registerPreloader,
  resetPreloader,
  unRegisterPreloader,
} from '@/animation/signals/preloaderSignals';

export default function PageReset(): React.ReactElement | null {
  const pathName = usePathname();

  useEffect(() => {
    registerPreloader();
    document.fonts.ready
      ? Promise.all([document.fonts.ready, document.readyState]).then(() => {
          setTimeout(unRegisterPreloader, 300);
        })
      : setTimeout(unRegisterPreloader, 300);

    return () => resetPreloader();
  }, [pathName]);

  return null;
}
