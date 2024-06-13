'use client';

import useAnimationSignal from '@Layouts/Animation/animationSignal';
import useLoadManageSignal from '@Layouts/Animation/loadManageSignal';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function useLogicAnimate(): void {
  const pathName = usePathname();
  const { reset: resetAnimation, resetForPopup } = useAnimationSignal();
  const { reset: resetLoader } = useLoadManageSignal();

  useEffect(() => {
    resetLoader();
    resetForPopup();
    resetAnimation();
  }, [pathName]);
}
