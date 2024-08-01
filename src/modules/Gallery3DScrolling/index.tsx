'use client';

import Gallery from '@Modules/Gallery3DScrolling/Components/Gallery';
import { Environment, MeshReflectorMaterial, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import s from './style.module.scss';
export default function Gallery3DScrolling() {
  return (
    <div className={s.container}>
      <Canvas
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [0, 0, 18], fov: 35 }}
        gl={{ alpha: false }}
      >
        <fog attach="fog" args={['#17171b', 30, 40]} />
        <color attach="background" args={['#17171b']} />
        <ambientLight intensity={0.25} />
        <directionalLight
          castShadow
          intensity={2}
          position={[10, 6, 6]}
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera attach="shadow-camera" left={-20} right={20} top={20} bottom={-20} />
        </directionalLight>
        <Suspense fallback={null}>
          <ScrollControls pages={10} infinite={true}>
            <Gallery po={[-1, 0.2, 0]} />
            <Gallery po={[1, 0.4, -10]} />
            <Gallery po={[-1, 0.2, -20]} />
            <Gallery po={[1, 0.4, -30]} />
          </ScrollControls>
          <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[400, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={15}
              depthScale={1}
              minDepthThreshold={0.85}
              color="#151515"
              metalness={0.6}
              roughness={1}
            />
          </mesh>
          <Environment preset="dawn" />
        </Suspense>
      </Canvas>
    </div>
  );
}
