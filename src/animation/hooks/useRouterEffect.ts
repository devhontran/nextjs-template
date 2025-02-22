import { useRouter } from 'next/navigation';

import { useEffectContext } from '@/animation/contexts/EffectContext';

interface ILinkEffect {
  pathName: string;
  pageName?: string;
  typeEffect?: string;
  isPrefetch?: boolean;
}

export default function useRouterEffect(): {
  routerPrefetch: ({ pathName, pageName, typeEffect, isPrefetch }: ILinkEffect) => void;
  routerPush: () => void;
} {
  const router = useRouter();
  const { pageLeave, routerState } = useEffectContext();
  const routerPrefetch = ({
    pathName,
    pageName = 'Home',
    typeEffect = 'fade',
    isPrefetch = true,
  }: ILinkEffect): void => {
    if (pathName === routerState.peek().pathName) return window.location.reload();
    if (isPrefetch) router.prefetch(pathName);
    pageLeave();
    routerState.value = {
      pathName,
      pageName,
      typeEffect,
    };
  };

  const routerPush = (): void => {
    router.push(routerState.peek().pathName);
  };

  return { routerPrefetch, routerPush };
}
