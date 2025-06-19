import { Box, Flex, GridItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRef } from 'react';

import MaskBoxScrolling from '@/animation/components/MaskBoxScrolling';
import { useLinesMask } from '@/animation/components/Typo/Lines/useLinesMask';
import { usePageEnter } from '@/animation/hooks/useEffectHooks';
import { GridContent } from '@/components/Container';
import { Heading } from '@/components/Typography';

import AwardItem from '../Components/AwardItem';
import SectionBlock from '../Components/SectionBlock';
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
      <GridContent>
        <GridItem colSpan={11}>
          <Flex direction={'column'} gap="24rem">
            <SectionBlock title="About Me">
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
            </SectionBlock>

            <SectionBlock title="Awards">
              <Flex direction={'column'}>
                <AwardItem />
                <AwardItem />
                <AwardItem />
                <AwardItem />
              </Flex>
            </SectionBlock>

            <Box ml={'calc(var(--space-16) * -1)'} w="calc(100% + var(--space-16) * 2)">
              <MaskBoxScrolling>
                <Flex position={'relative'} w="100%" height={'100vh'}>
                  <Box position={'absolute'} top={0} left={0} right={0} bottom={0}>
                    <Image
                      src={
                        'https://images.unsplash.com/photo-1643228995868-bf698f67d053?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
                    Crafting innovative websites, landing pages & branding experiences with
                    precision, transparency & creativity.
                  </Heading>
                </Flex>
              </MaskBoxScrolling>
            </Box>
          </Flex>
        </GridItem>
      </GridContent>
    </Box>
  );
}
