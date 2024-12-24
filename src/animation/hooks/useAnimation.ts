import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect } from 'react';

import { useAnimationContext } from '../contexts/AnimationContext';
import { pageLoadingState, pageTransitionState } from '../signals/animationSignals';
import { usePreloader } from './usePreloader';

export function useAnimation() {
  const pathname = usePathname();
  const { playAnimation, resetAnimation } = useAnimationContext();
  const { progress } = usePreloader();

  useLayoutEffect(() => {
    initGSAP();
  }, []);

  useEffect(() => {
    pageLoadingState.value = true;
    pageTransitionState.value = 'enter';

    const cleanup = () => {
      resetAnimation();
      pageTransitionState.value = 'idle';
    };

    return cleanup;
  }, [pathname]);

  // Auto play animation when loading completes
  useEffect(() => {
    if (progress.value === 1) {
      playAnimation();
    }
  }, [progress.value]);
}
