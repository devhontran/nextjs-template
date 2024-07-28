
import { useProgress } from '@react-three/drei';
import { useEffect } from 'react';

export default function useProcessingR3f(): void {
  const { total, loaded } = useProgress();
  useEffect(() => {
    // PageLoaderProxy.isR3fLoaded = loaded === total;
  }, [total, loaded]);
}
