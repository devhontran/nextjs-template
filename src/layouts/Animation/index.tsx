'use client';

import PageLoader from '@Layouts/PageLoader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { PropsWithChildren, ReactElement, useLayoutEffect } from 'react';

interface IProp extends PropsWithChildren {}

export default function Animate({ children }: IProp): ReactElement {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  console.log('_____Animate_render');
  // usePageEnter(() => {
  //   console.log('_____vl');
  //   const ob = new ResizeObserver(() => {
  //     console.log('____Redse', document.body.scrollHeight);
  //     // ScrollTrigger.refresh();
  //   });
  //   ob.observe(document.body);
  //
  //   return () => {
  //     ob.unobserve(document.body);
  //     ob.disconnect();
  //   };
  // });
  return (
    <main>
      <PageLoader />
      {children}
    </main>
  );
}
