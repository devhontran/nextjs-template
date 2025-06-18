import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRef } from 'react';

import { useLinesMask } from '@/animation/components/Typo/Lines/useLinesMask';
import { usePageEnter } from '@/animation/hooks/useEffectHooks';
import { Heading, Label } from '@/components/Typography';

import s from './styles.module.scss';
export default function About(): React.ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  const { motionIn } = useLinesMask({
    refContent,
  });

  usePageEnter(() => {
    motionIn();
  });
  return (
    <Box py="18rem">
      <div className="container">
        <Flex direction={'column'} gap="4rem">
          <Flex direction={'column'} gap="2rem">
            <Label textTransform={'uppercase'} letterSpacing={'.2em'} fontWeight={'black'}>
              About Me
            </Label>
            <Heading fontSize={'6rem'} fontWeight={'normal'} className={s.mainContent}>
              First Vietnamese developer to win an international web award. Founder & Creative
              Developer of hontran.dev, specializing in{' '}
              <Text display={'inline'} fontWeight={'bold'} color="yellow">
                Next.js
              </Text>
              ,{' '}
              <Text display={'inline'} fontWeight={'bold'} color="yellow">
                React.js
              </Text>
              ,{' '}
              <Text display={'inline'} fontWeight={'bold'} color="yellow">
                Strapi
              </Text>
              ,{' '}
              <Text display={'inline'} fontWeight={'bold'} color="yellow">
                Webflow
              </Text>{' '}
              and{' '}
              <Text display={'inline'} fontWeight={'bold'} color="yellow">
                WordPress
              </Text>
              .
            </Heading>
          </Flex>

          <Flex direction={'column'} gap="2rem">
            <Label textTransform={'uppercase'} letterSpacing={'.2em'} fontWeight={'black'}>
              Awards
            </Label>
            <Heading fontSize={'6rem'} fontWeight={'normal'} className={s.mainContent}>
              6× Awwwards Developer
            </Heading>
            <Heading fontSize={'6rem'} fontWeight={'normal'} className={s.mainContent}>
              7× Awwwards SOTD
            </Heading>
            <Heading fontSize={'6rem'} fontWeight={'normal'} className={s.mainContent}>
              7× FWA Awards
            </Heading>
          </Flex>

          <Flex position={'relative'} height={'100vh'} w="100%">
            <Box position={'absolute'} top={0} left={0} right={0} bottom={0}>
              <Image
                src={
                  'https://images.unsplash.com/photo-1509023464722-18d996393ca8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
                alt="Awwwards Developer"
                fill
              />
            </Box>

            <Heading
              position={'absolute'}
              top={'50%'}
              transform={'translateY(-50%)'}
              textAlign={'center'}
              fontSize={'8rem'}
              fontWeight={'normal'}
              className={s.mainContent}
            >
              Crafting innovative websites, landing pages & branding experiences with precision,
              transparency & creativity.
            </Heading>
          </Flex>
        </Flex>
      </div>
    </Box>
  );
}
