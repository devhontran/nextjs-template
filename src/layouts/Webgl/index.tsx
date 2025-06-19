'use client';

import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig';
import React, { Suspense } from 'react';

import Lens from '@/modules/Home/Components/Lens';

export default function Webgl(): React.ReactElement {
  return (
    <>
      <GlobalCanvas style={{ zIndex: -1 }} globalRender={false}>
        {(globalChildren) => (
          <>
            <Suspense fallback={null}>
              <Lens>
                <>
                  <ambientLight />
                  {globalChildren as React.ReactElement}
                </>
              </Lens>
            </Suspense>
          </>
        )}
      </GlobalCanvas>
      <SmoothScrollbar />
    </>
  );
}
