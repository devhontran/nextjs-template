'use client';

import useLoadManageSignal from '@Layouts/Animation/loadManageSignal';
import { getTransitionThumbnail } from '@Utils/uiHelper';
import Image, { ImageProps } from 'next/image';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

import s from './style.module.scss';

const ImagePlaceHolder = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageLoadedRef = useRef<HTMLImageElement>(null);
  const { registerLoad } = useLoadManageSignal();

  //for loader manager
  useEffect(() => {
    const rect = imageLoadedRef.current?.getBoundingClientRect();
    if (!rect || rect.top > window.innerHeight) return;

    const { src } = getTransitionThumbnail({
      url: props.src as string,
      height: 100,
      width: 100,
      quality: 50,
    });

    src && registerLoad(src as string, 'IMAGE PLACE');
  }, []);

  return (
    <div ref={ref} className={`${s.imagePreload} ${isLoaded && s.isLoaded} imagePreload`}>
      <Image
        className={`${props.className} ${s.imagePreload_origin}`}
        onLoad={(): void => {
          setIsLoaded(true);
        }}
        quality={100}
        sizes={`${props.width ? `(max-width: ${props.width}px) 100vw, ${props.width}px` : '100vw'}`}
        {...props}
        alt={props.alt}
      />
      <Image
        ref={imageLoadedRef}
        className={`${props.className} ${s.imagePreload_placeholder}`}
        src={props.src}
        width={100}
        height={100}
        sizes={'15vw'}
        quality={50}
        loading="eager"
        alt="eager"
      />
    </div>
  );
});

ImagePlaceHolder.displayName = 'ImagePlaceHolder';
export default ImagePlaceHolder;
