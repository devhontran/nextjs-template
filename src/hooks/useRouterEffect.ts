import { useRouter } from 'next/navigation';

import {
  dispatchUrl,
  pageEffectIn,
  urlState,
} from '@/animation/components/PageEffect/pageEffectSignal';
import { pageBeforeLeave } from '@/animation/usePageStatus';

export default function useRouterEffect(): {
  routerEffect: ({ url }: { url: string }) => void;
} {
  const router = useRouter();
  const routerEffect = ({ url }: { url: string }): void => {
    if (urlState.peek() === url) return;
    router.prefetch(url);
    dispatchUrl(url);
    pageBeforeLeave();
    pageEffectIn();
  };

  return { routerEffect };
}
