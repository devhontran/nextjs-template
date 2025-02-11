'use client';

import { useSignalEffect } from '@preact/signals-react';
import Image, { ImageProps } from 'next/image';
import { ReactElement, useLayoutEffect, useRef, useState } from 'react';

import { registerPreloader, unRegisterPreloader } from '@/animation/signals/preloaderSignals';
import { useIsInViewport } from '@/hooks/useIsInViewport';

import s from './style.module.scss';

const ImagePlaceHolder = (props: ImageProps): ReactElement => {
  const refPlaceImg = useRef<HTMLImageElement>(null);
  const [width, setWidth] = useState<number>(50);
  const [height, setHeight] = useState<number>(50);

  const { className, width: widthProp, height: heightProp, alt, src } = props;

  const { visible, kill: killVisible } = useIsInViewport({
    ref: refPlaceImg,
  });

  useSignalEffect(() => {
    if (visible.value) {
      setWidth(Number(widthProp) ?? 50);
      setHeight(Number(heightProp) ?? 50);
      killVisible();
    }
  });

  const onLoaded = (): void => {
    unRegisterPreloader();
    refPlaceImg.current?.style.setProperty(
      'aspect-ratio',
      `${refPlaceImg.current?.width} / ${refPlaceImg.current?.height}`
    );
  };

  useLayoutEffect(() => {
    registerPreloader();
    return () => {
      unRegisterPreloader();
    };
  }, []);

  return (
    <div className={`${s.imagePlaceholder} image-placeholder`}>
      <Image
        ref={refPlaceImg}
        className={`${className}`}
        src={src}
        width={width}
        height={height}
        alt={`${alt}`}
        loading="eager"
        onLoad={onLoaded}
        onError={onLoaded}
      />
    </div>
  );
};

export default ImagePlaceHolder;
