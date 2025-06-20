'use client';

import { MeshTransmissionMaterial, useFBO, useGLTF } from '@react-three/drei';
import { createPortal, useFrame, useThree } from '@react-three/fiber';
import type { ReactElement } from 'react';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface LensProps {
  children?: ReactElement;
  damping?: number;
  [key: string]: unknown;
}

export default function Lens({ children, damping = 0.2, ...props }: LensProps): ReactElement {
  const ref = useRef(null);
  const { camera } = useThree();

  const { nodes } = useGLTF('/lens-transformed.glb');

  const buffer = useFBO();
  const viewport = useThree((state) => state.viewport);
  const [scene] = useState(() => new THREE.Scene());
  useFrame((state, delta) => {
    //   const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, camera.fov]);
    //   easing.damp3(
    //     ref.current.position,
    //     [(state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, camera.fov],
    //     damping,
    //     delta
    //   );

    state.gl.setRenderTarget(buffer);
    state.gl.setClearColor(0x000000, 0);
    state.gl.render(scene, state.camera);
    state.gl.setRenderTarget(null);
  });

  const PlanMesxxx = () => {
    return (
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} />
      </mesh>
    );
  };

  const CylinderMesh = () => {
    return (
      <mesh
        scale={Math.min(viewport.width, viewport.height) / 5}
        ref={ref}
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

  return (
    <>
      {createPortal(children, scene)}
      <PlanMesxxx />
      {/* <CylinderMesh /> */}
    </>
  );
}
