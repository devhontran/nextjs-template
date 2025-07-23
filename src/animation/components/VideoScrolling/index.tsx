'use client';

import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ReactElement, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.esm.jsx';

import { useAssetsContext } from '@/animation/contexts/AssetsContext';
import { Paragraph } from '@/components/Typography';

import Description from './Description';

export default function VideoScrolling(): ReactElement {
  const refContainer = useRef<HTMLDivElement>(null);
  const refDesc_1 = useRef<IRefInteraction>(null);
  const refDesc_2 = useRef<IRefInteraction>(null);
  const refDesc_3 = useRef<IRefInteraction>(null);

  const { registerAssets, unRegisterAssets } = useAssetsContext();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!refContainer.current) return;
    registerAssets();
  });

  const onChange = (progress: number): void => {
    if (progress > 0.08 && progress < 0.2) {
      refDesc_1.current?.motionIn?.();
    } else {
      refDesc_1.current?.motionOut?.();
    }

    if (progress > 0.36 && progress < 0.56) {
      refDesc_2.current?.motionIn?.();
    } else {
      refDesc_2.current?.motionOut?.();
    }

    if (progress > 0.76 && progress < 0.92) {
      refDesc_3.current?.motionIn?.();
    } else {
      refDesc_3.current?.motionOut?.();
    }
  };

  return (
    <Box position="relative" overflow={'clip'}>
      <Box
        ref={refContainer}
        position="relative"
        width="100%"
        height="600vh"
        css={{
          '& [data-scrolly-container]': {
            maskImage:
              'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%)',
          },
          '& video': {
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          },

          '& video + canvas + canvas': {
            zIndex: 2,
          },
        }}
      >
        <ScrollyVideo
          debug={true}
          onChange={onChange}
          onReady={() => {
            unRegisterAssets();
          }}
          src={
            'https://player.vimeo.com/progressive_redirect/download/1091541013/rendition/1080p/animation_test_006%20%281080p%29.mp4?loc=external&signature=9b98189958860b7dbe64b3fbf801da361f96961fe7640a99cc45cbc5ec9597f7&user_id=204324697'
          }
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          preload="auto"
          playsInline
          muted
        />
      </Box>
      <Box position="absolute" top={0} left={0} right={0} bottom={0}>
        <Box position={'sticky'} top={0} height={'100lvh'} width={'100%'}>
          <Box position="relative" height={'100%'} width={'100%'}>
            <Description ref={refDesc_1} left={'14rem'}>
              <Paragraph size={32}>
                Xplor gives back hundreds of hours each year, so educators can stop managing
                paperwork and start nurturing minds.
              </Paragraph>
            </Description>
            <Description ref={refDesc_2} left={'60rem'}>
              <Paragraph size={32}>
                The average Australian needs over 10 years to save for a house deposit. Dwell asks -
                why should you do it alone?
              </Paragraph>
            </Description>
            <Description ref={refDesc_3} left={'40rem'}>
              <Paragraph size={32}>
                Kismet automates the admin, so families don’t have to choose between earning an
                income and looking after loved ones.
              </Paragraph>
            </Description>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
