'use client';

import Image, { ImageProps } from 'next/image';
import { ReactElement, useRef } from 'react';

const ImagePreload = (props: ImageProps): ReactElement => {
  const refImg = useRef<HTMLImageElement>(null);
  const { className, alt } = props;

  return (
    <Image
      ref={refImg}
      className={`${className}`}
      sizes="100vw"
      quality={100}
      {...props}
      alt={alt}
    />
  );
};

export default ImagePreload;
