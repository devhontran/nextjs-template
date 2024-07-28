'use client';

import {
  pageEnter,
  pageLeave,
  pageReplace,
  PageStatus,
  pageStatus,
  usePageEnter,
  usePageForeEnter,
} from '@Layouts/Animation/usePageStatus';
import {
  registerPreloader,
  resetPreloader,
  unRegisterPreloader,
} from '@Layouts/Animation/usePreloader';
import PageEffect from '@Layouts/PageEffect';
import {
  dispatchUrl,
  dispatchUrlValue,
  pageEffectOut,
  PageEffectStatus,
  pageEffectStatus,
  usePageEffectInned,
  usePageEffectOuted,
} from '@Layouts/PageEffect/pageEffectSignal';
import PageLoader from '@Layouts/PageLoader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, ReactElement, useEffect, useLayoutEffect, useRef } from 'react';

interface IProp extends PropsWithChildren {}

export default function Animate({ children }: IProp): ReactElement {
  const pathName = usePathname();
  const router = useRouter();
  const refTimeOut = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (pageStatus.peek() === PageStatus.PAGE_ONCE) {
      dispatchUrl(pathName);
    } else {
      pageReplace();
    }

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

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

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

  usePageForeEnter(() => {
    pageEffectStatus.peek() === PageEffectStatus.INNED && pageEffectOut();
  });

  usePageEffectOuted(() => {
    pageEnter();
  });

  return (
    <main>
      <PageLoader />
      <PageEffect />
      {children}
    </main>
  );
}
