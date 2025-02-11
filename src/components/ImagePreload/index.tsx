'use client';

import Image, { ImageProps } from 'next/image';
import { ReactElement, useLayoutEffect, useRef } from 'react';

import { registerPreloader, unRegisterPreloader } from '@/animation/signals/preloaderSignals';

const ImagePreload = (props: ImageProps): ReactElement => {
  const refImg = useRef<HTMLImageElement>(null);
  const { className, alt } = props;

  useLayoutEffect(() => {
    registerPreloader();
    return () => {
      unRegisterPreloader();
    };
  }, []);

  return (
    <Image
      ref={refImg}
      className={`${className}`}
      sizes="100vw"
      quality={100}
      {...props}
      alt={alt}
      onLoad={unRegisterPreloader}
      onError={unRegisterPreloader}
    />
  );
};

export default ImagePreload;
