'use client';

import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { ReactElement } from 'react';

import s from './ImagePlaceholder.module.scss';

const ImagePlaceHolder = ({
  ref,
  isFull,
  borderRadius,
  ...props
}: ImageProps &
  BoxProps & {
    ref?: React.RefObject<HTMLDivElement | null>;
    isFull?: boolean;
    borderRadius?: string;
  }): ReactElement => {
  const { className, width, height, alt, src } = props;

  return (
    <Box
      borderRadius={borderRadius ?? '0rem'}
      contain={'content'}
      className={`${s.imagePlaceholder} image-placeholder`}
      ref={ref}
    >
      <Image
        className={className ?? ''}
        src={src}
        width={50}
        height={50}
        alt={alt}
        loading="eager"
      />
      <Image
        src={src}
        width={width}
        height={height}
        onLoad={(e) => {
          (e.target as HTMLImageElement).classList.add(s.isLoaded);
        }}
        alt={alt}
        sizes={isFull ? '100vw' : `(min-width: ${width}px) ${width}px, 100vw`}
        quality={100}
        className={`${className ?? ''} ${s.imagePlaceholder__original}`}
      />
    </Box>
  );
};

export default ImagePlaceHolder;
