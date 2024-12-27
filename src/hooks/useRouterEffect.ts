import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { pageLeave, routerState } from '@/animation/signals/pageSignals';

interface ILinkEffect {
  pathName: string;
  pageName?: string;
  typeEffect?: string;
}

export default function useRouterEffect(): {
  routerPrefetch: ({ pathName, pageName, typeEffect }: ILinkEffect) => void;
  routerPush: () => void;
} {
  const router = useRouter();
  const routerPrefetch = useCallback(
    ({ pathName, pageName = 'Home', typeEffect = 'fade' }: ILinkEffect): void => {
      if (pathName === routerState.value.pathName) return window.location.reload();
      router.prefetch(pathName);

      routerState.value = {
        pathName,
        pageName,
        typeEffect,
      };
    },
    [router]
  );

  const routerPush = useCallback(() => {
    pageLeave();
    router.push(routerState.value.pathName);
  }, [router]);

  return { routerPrefetch, routerPush };
}
