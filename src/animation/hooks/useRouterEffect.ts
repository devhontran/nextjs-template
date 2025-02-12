import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useEffectContext } from '@/animation/contexts/EffectContext';

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
  const { pageLeave, routerState } = useEffectContext();
  const routerPrefetch = useCallback(
    ({ pathName, pageName = 'Home', typeEffect = 'fade' }: ILinkEffect): void => {
      if (pathName === routerState.peek().pathName) return window.location.reload();
      router.prefetch(pathName);
      pageLeave();
      routerState.value = {
        pathName,
        pageName,
        typeEffect,
      };
    },
    [router]
  );

  const routerPush = useCallback(() => {
    router.push(routerState.peek().pathName);
  }, [router]);

  return { routerPrefetch, routerPush };
}
