'use client';

import Image, { ImageProps } from 'next/image';
import { ReactElement, useRef } from 'react';

import useImagePreloader from '@/animation/useImagePreloader';

import s from './style.module.scss';

const ImagePreload = (props: ImageProps): ReactElement => {
  const refImg = useRef<HTMLImageElement>(null);
  const onLoaded = useImagePreloader(refImg);
  const { className, alt } = props;
  return (
    <Image
      ref={refImg}
      className={`${className} ${s.imagePreload_origin}`}
      sizes="100vw"
      quality={100}
      onLoad={onLoaded}
      {...props}
      alt={alt}
    />
  );
};

export default ImagePreload;
