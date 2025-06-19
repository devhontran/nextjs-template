'use client';

import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import ImagePlaceHolder from '@/components/ImagePlaceHolder';

import { SERVICES } from '../../mockup.data';

export default function ServiceBg(): React.ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!refContent.current) return;
    gsap.fromTo(
      refContent.current,
      { clipPath: 'inset(50% 50% 0% 50%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.4,
        ease: 'linear',
        scrollTrigger: {
          trigger: refContent.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
        },
      }
    );
  });
  return (
    <Box
      position={'absolute'}
      top={0}
      left={'calc(var(--space-16) * -1)'}
      w="calc(100% + var(--space-16) * 2)"
      h="100%"
      zIndex={-1}
      opacity={0.25}
    >
      <Box
        ref={refContent}
        position={'sticky'}
        top={'var(--header-height)'}
        h="calc(100vh - var(--header-height))"
        bg="red"
      >
        <Box position={'relative'} w="100%" h="100%">
          {SERVICES.map((service) => (
            <Box key={service.title} position={'absolute'} top={0} left={0} w="100%" h="100%">
              <ImagePlaceHolder src={service.image} alt={service.title} width={1600} height={900} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
