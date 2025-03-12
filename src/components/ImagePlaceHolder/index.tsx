'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { ReactElement } from 'react';
import { useLayoutEffect } from 'react';

import { useAssetsContext } from '@/animation/contexts/AssetsContext';

import s from './style.module.scss';

const ImagePlaceHolder = ({
  ref,
  ...props
}: ImageProps & { ref?: React.RefObject<HTMLDivElement> }): ReactElement => {
  const { className, width, height, alt, src } = props;
  const { registerAssets, unRegisterAssets } = useAssetsContext();

  useLayoutEffect(() => {
    registerAssets();
    return (): void => {
      unRegisterAssets();
    };
  }, []);

  return (
    <div className={`${s.imagePlaceholder} image-placeholder`} ref={ref}>
      <Image
        className={className ?? ''}
        src={src}
        width={50}
        height={50}
        alt={alt}
        loading="eager"
        onLoad={unRegisterAssets}
        onError={unRegisterAssets}
      />
      <Image
        src={src}
        width={width}
        height={height}
        onLoad={(e) => {
          (e.target as HTMLImageElement).classList.add(s.isLoaded);
        }}
        alt={alt}
        sizes="100vws"
        className={`${className ?? ''} ${s.imagePlaceholder__original}`}
      />
    </div>
  );
};

export default ImagePlaceHolder;
