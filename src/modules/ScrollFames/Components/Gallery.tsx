import { Image, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

export default function Gallery({ po = [0, 0, 0] }) {
  const refImage = useRef();
  const [state, _setState] = useState<number[]>(po);

  const scroll = useScroll();
  useFrame(() => (refImage.current.position.z = state[2] + scroll.offset * 50));
  return (
    <Image
      ref={refImage}
      position={po}
      url="https://images.unsplash.com/photo-1721332154191-ba5f1534266e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    />
  );
}
