import {
  pageEnter,
  pageLeave,
  pageReplace,
  PageStatus,
  pageStatus,
  usePageEnter,
  usePageForeEnter,
} from '@/animation/usePageStatus';
import {
  registerPreloader,
  resetPreloader,
  unRegisterPreloader,
} from '@Layouts/Animation/usePreloader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef } from 'react';

import {
  dispatchUrl,
  dispatchUrlValue,
  pageEffectOut,
  PageEffectStatus,
  pageEffectStatus,
  usePageEffectInned,
  usePageEffectOuted,
} from '@/animation/components/PageEffect/pageEffectSignal';

export default function useAnimationHelper(): void {
  const pathName = usePathname();
  const router = useRouter();
  const refTimeOut = useRef<NodeJS.Timeout | null>(null);
  useLayoutEffect(() => {
    // disableMotion();
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (pageStatus.peek() === PageStatus.PAGE_ONCE) {
      dispatchUrl(pathName);
    } else {
      pageReplace();
    }

    //first preloader base
    registerPreloader();
    refTimeOut.current = setTimeout(() => {
      unRegisterPreloader();
      refTimeOut.current = null;
    }, 300);

    return () => {
      if (refTimeOut.current) {
        clearTimeout(refTimeOut.current);
        unRegisterPreloader();
        refTimeOut.current = null;
      }
    };
  }, [pathName]);

  usePageEnter(() => {
    const ob = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    ob.observe(document.body);

    return () => {
      ob.unobserve(document.body);
      ob.disconnect();
    };
  });

  usePageEffectInned(() => {
    resetPreloader();
    pageLeave();
    router.push(dispatchUrlValue());
  });

  //#call Page Effect Animation out When router, load assets done.
  usePageForeEnter(() => {
    pageEffectStatus.peek() === PageEffectStatus.INNED && pageEffectOut();
  });

  //#pageEnter when have transition page
  usePageEffectOuted(() => {
    pageEnter();
  });
}
