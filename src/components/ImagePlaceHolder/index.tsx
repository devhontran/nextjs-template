'use client';

import Image, { ImageProps } from 'next/image';
import { ReactElement, useRef } from 'react';

import s from './style.module.scss';

const ImagePlaceHolder = (props: ImageProps): ReactElement => {
  const refPlaceImg = useRef<HTMLImageElement>(null);
  // const refOriginImg = useRef<HTMLImageElement>(null);

  const { className, alt, src } = props;

  return (
    <div className={`${s.imagePreload} imagePreload`}>
      {/* <Image
        className={`${className} ${s.imagePreload_origin}`}
        ref={refOriginImg}
        quality={100}
        sizes={`${width ? `(max-width: ${width}px) 100vw, ${width}px` : '100vw'}`}
        {...props}
        alt={alt}
      /> */}

      <Image
        ref={refPlaceImg}
        className={`${className} ${s.imagePreload_placeholder}`}
        src={src}
        width={50}
        height={50}
        alt={`${alt}-placeholder`}
      />
    </div>
  );
};

export default ImagePlaceHolder;
