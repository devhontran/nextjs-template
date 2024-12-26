'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { resetPreloader } from '../signals/preloderSignals';

export default function PageReset(): React.ReactElement | null {
  const pathName = usePathname();

  useEffect(() => {
    resetPreloader();
  }, [pathName]);

  return null;
}
