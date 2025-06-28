'use client';

import { MeshTransmissionMaterial, useFBO } from '@react-three/drei';
import { createPortal, useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import type { ReactElement } from 'react';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface LensProps {
  children?: ReactElement;
  damping?: number;
  [key: string]: unknown;
}

const CylinderMesh = ({
  viewport,
  meshRef,
  buffer,
  ...props
}: {
  viewport: { width: number; height: number };
  meshRef: React.RefObject<THREE.Mesh | null>;
  buffer: THREE.WebGLRenderTarget;
  [key: string]: unknown;
}): ReactElement => {
  return (
    <mesh
      scale={Math.min(viewport.width, viewport.height) / 5}
      ref={meshRef}
      rotation-x={Math.PI / 2}
      geometry={new THREE.SphereGeometry(1, 32, 32)}
      {...props}
    >
      <MeshTransmissionMaterial
        buffer={buffer.texture}
        ior={1.2}
        thickness={1.5}
        anisotropy={0.1}
        chromaticAberration={0.04}
      />
    </mesh>
  );
};

export default function Lens({ children, damping = 0.2, ...props }: LensProps): ReactElement {
  const ref = useRef<THREE.Mesh | null>(null);
  const { camera } = useThree();

  const buffer = useFBO();
  const viewport = useThree((state) => state.viewport);
  const [scene] = useState(() => new THREE.Scene());

  useFrame((state, _delta) => {
    if (!ref.current?.position) return;

    // Type guard to check if camera is PerspectiveCamera
    const fov = 'fov' in camera ? camera.fov : 75; // Default FOV for orthographic fallback

    const currentViewport = state.viewport.getCurrentViewport(state.camera, [0, 0, fov]);
    easing.damp3(
      ref.current.position,
      [
        (state.pointer.x * currentViewport.width) / 2,
        (state.pointer.y * currentViewport.height) / 2,
        fov,
      ],
      damping,
      _delta
    );

    state.gl.setRenderTarget(buffer);
    state.gl.setClearColor(0x000000, 0);
    state.gl.render(scene, state.camera);
    state.gl.setRenderTarget(null);
  });

  return (
    <>
      {createPortal(children, scene)}
      <CylinderMesh viewport={viewport} meshRef={ref} buffer={buffer} {...props} />
    </>
  );
}
