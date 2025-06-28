import { Image } from '@react-three/drei';
import type { ReactElement } from 'react';

interface ImageWorkWebglProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
  url?: string;
}

export default function ImageWorkWebgl({ props, url }: ImageWorkWebglProps): ReactElement {
  //   const { width, height } = useThree((state) => state.viewport);
  return (
    <Image
      {...props}
      url={
        url ??
        'https://images.unsplash.com/photo-1677100091644-53575a136cfb?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    />
  );
}
