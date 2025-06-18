import { Box } from '@chakra-ui/react';
import Image from 'next/image';

export default function ImgSvg({
  src,
  alt,
  width,
  height,
  w,
  h,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  w?: string;
  h?: string;
  className?: string;
}): React.ReactElement {
  return (
    <Box
      w={w}
      h={h}
      css={{
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        },
      }}
    >
      <Image unoptimized src={src} alt={alt} width={width} height={height} className={className} />
    </Box>
  );
}
