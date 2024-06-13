'use client';

import s from '@Components/ImagePlaceHolder/style.module.scss';
import useLoadManageSignal from '@Layouts/Animation/loadManageSignal';
import { getTransitionThumbnail, handleConvertSize } from '@Utils/uiHelper';
import Image, { ImageProps } from 'next/image';
import React, { forwardRef, useEffect } from 'react';

import { IImageGenerative } from '@/types/image';

const ImagePreload = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const { registerLoad } = useLoadManageSignal();

  const { w, h } = handleConvertSize({
    width: props.width as number,
    height: props.height as number,
  });

  useEffect(() => {
    const { src } = getTransitionThumbnail({
      ...props,
      width: w || undefined,
      height: h || undefined,
      quality: 100,
    } as IImageGenerative);
    src && registerLoad(src as string);
  }, [w, h]);

  return (
    <Image
      ref={ref}
      className={`${props.className} ${s.imagePreload_origin}`}
      sizes="100vw"
      width={props.width ? w : undefined}
      height={props.height ? h : undefined}
      quality={100}
      {...props}
      loading="eager"
      alt={props.alt}
    />
  );
});

ImagePreload.displayName = 'ImagePreload';
export default ImagePreload;
