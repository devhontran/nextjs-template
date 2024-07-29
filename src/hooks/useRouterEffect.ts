import { pageBeforeLeave } from '@Layouts/Animation/usePageStatus';
import { dispatchUrl, pageEffectIn, urlState } from '@Layouts/PageEffect/pageEffectSignal';
import { useRouter } from 'next/navigation';

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
