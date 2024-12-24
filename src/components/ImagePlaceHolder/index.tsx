'use client';

import { useSignal, useSignalEffect } from '@preact/signals-react';
import Image, { ImageProps } from 'next/image';
import { ReactElement, useRef, useState } from 'react';

import useImagePreloader from '@/animation/useImagePreloader';

import s from './style.module.scss';

const ImagePlaceHolder = (props: ImageProps): ReactElement => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const isLoaded = useSignal<boolean>(false);
  const refPlaceImg = useRef<HTMLImageElement>(null);
  const onLoaded = useImagePreloader(refPlaceImg);
  const { className, width, alt, src } = props;

  useSignalEffect(() => {
    isLoaded.value && refPlaceImg.current?.classList.add(s.isLoaded);
  });

  return (
    <div className={`${s.imagePreload} imagePreload`}>
      {isReady && (
        <Image
          className={`${className} ${s.imagePreload_origin}`}
          onLoad={(): void => {
            isLoaded.value = true;
          }}
          quality={100}
          sizes={`${width ? `(max-width: ${width}px) 100vw, ${width}px` : '100vw'}`}
          {...props}
          alt={alt}
        />
      )}
      <Image
        ref={refPlaceImg}
        className={`${className} ${s.imagePreload_placeholder}`}
        src={src}
        onLoad={() => {
          onLoaded();
          setIsReady(true);
        }}
        width={50}
        height={50}
        alt={`${alt}-placeholder`}
      />
    </div>
  );
};

export default ImagePlaceHolder;
