'use client';

import { ScrollScene, UseCanvas } from '@14islands/r3f-scroll-rig';
import { Box, Flex } from '@chakra-ui/react';
import type { RefObject } from 'react';
import { useRef } from 'react';

import { Heading } from '@/components/Typography';

import HeroImageWebgl from './HeroImageWebgl';

export default function Hero(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Flex direction={'column'} gap="3rem" py="12rem">
        <Heading fontSize={'3rem'} textTransform={'uppercase'} textAlign={'center'}>
          Hon Q. Tran
        </Heading>
        <Heading
          fontSize={'12rem'}
          fontWeight={'bold'}
          textAlign={'center'}
          textTransform={'uppercase'}
        >
          Founder <br /> Creative Developer <br /> at hontran.dev
        </Heading>
        <Heading fontSize={'3rem'} textTransform={'uppercase'} textAlign={'center'}>
          From HCM, Vietnam
        </Heading>
      </Flex>
      <Box position={'relative'} overflow={'clip'} pr="var(--space-16)">
        <Box ref={ref} w="100%" aspectRatio={'4/3'} />
        <UseCanvas>
          <ScrollScene track={ref as RefObject<HTMLElement>}>
            {(props) => <HeroImageWebgl props={props} />}
          </ScrollScene>
        </UseCanvas>
      </Box>
    </div>
  );
}
