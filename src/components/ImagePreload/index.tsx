'use client';

import Image, { ImageProps } from 'next/image';
import { ReactElement, useLayoutEffect, useRef } from 'react';

import { useAssetsContext } from '@/animation/contexts/AssetsContext';

const ImagePreload = (props: ImageProps): ReactElement => {
  const refImg = useRef<HTMLImageElement>(null);
  const { className, alt } = props;
  const { registerAssets, unRegisterAssets } = useAssetsContext();
  useLayoutEffect(() => {
    registerAssets();
    return () => {
      unRegisterAssets();
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
      onLoad={unRegisterAssets}
      onError={unRegisterAssets}
    />
  );
};

export default ImagePreload;
