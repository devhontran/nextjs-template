'use client';

import useImageParallax from '@Interactive/ImageParallax/useImageParallax';
import Image from 'next/image';
import React, { useRef } from 'react';

import s from './styles.module.scss';

interface IImageParallax {
  src: string;
  srcBlur?: string;
  alt: string;
  width?: number;
  height?: number;
  scale?: number;
  className?: string;
}

export default function ImageParallax({
  src,
  srcBlur = src,
  alt,
  className,
  width,
  height,
  scale,
}: IImageParallax): React.ReactElement {
  const refWrap = useRef<HTMLDivElement | null>(null);
  const refContent = useRef<HTMLImageElement | null>(null);

  useImageParallax({ refWrap, refContent, scale });
  return (
    <div className={`${s.imgParallax} imgParallax`}>
      <div ref={refWrap} className={`${className} ${s.imgParallax_inner} imgParallax_inner`}>
        <Image
          width={width}
          height={height}
          ref={refContent}
          src={src}
          alt={alt}
          blurDataURL={srcBlur}
          placeholder="blur"
        />
      </div>
    </div>
  );
}
