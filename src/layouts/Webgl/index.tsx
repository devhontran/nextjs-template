'use client';

import { Preload, View } from '@react-three/drei';
import { Canvas as R3fCanvas } from '@react-three/fiber';
import React, { Suspense } from 'react';

export default function Webgl(): React.ReactElement {
  return (
    <R3fCanvas
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        zIndex: 3,
      }}
      eventSource={document.body}
    >
      <Suspense fallback={null}>
        <View.Port />
        <Preload all />
      </Suspense>
    </R3fCanvas>
  );
}
