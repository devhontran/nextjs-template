'use client';

import { Box, chakra, Flex, GridItem, Text } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import type { Signal } from '@preact/signals-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

import { GridContent } from '@/components/Container';

import Tags from '../../Tags';

interface ServiceItemProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  index: number;
  progressItem: Signal<number[]>;
}

export default function ServiceItem({
  title,
  description,
  tags,
  index,
  progressItem,
}: ServiceItemProps): React.ReactElement {
  const refContent = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
  });

  return (
    <Flex direction={'column'} gap="4rem" position={'relative'} py="2.4rem">
      <Box height={'40rem'} position={'relative'} zIndex={1}>
        <GridContent position={'sticky'} top={'calc(var(--header-height) + 2.4rem)'}>
          <GridItem colSpan={4}>
            <Text fontSize={'3rem'} lineHeight={1.2} textTransform={'uppercase'}>
              {title}
            </Text>
          </GridItem>
          <GridItem colSpan={3} colStart={6} pt=".45em">
            <Tags tags={tags} />
          </GridItem>
        </GridContent>
      </Box>
      <GridContent position={'relative'} zIndex={1} alignItems={'flex-end'} pr="var(--space-16) ">
        <GridItem colSpan={3} colStart={6}>
          <Text fontSize={'1.5rem'}>{description}</Text>
        </GridItem>
        <GridItem colSpan={2} colStart={10} pb=".25em">
          <Text
            fontSize={'1.4rem'}
            mb="1.2rem"
            css={{ '& strong': { color: 'yellow', fontWeight: 700 } }}
          >
            Sprint <br /> from <strong>$1,500</strong>
          </Text>
          <chakra.a
            width={'100%'}
            px="1.2rem"
            py="1rem"
            display={'block'}
            border="1px solid yellow"
            borderRadius={'2.4rem'}
            color="yellow"
            fontSize={'1.4rem'}
            textAlign={'center'}
            textTransform={'uppercase'}
            href={`mailto:hello@hontran.dev?subject=Start the project ${title}`}
            transition={'all 0.3s var(--ease-outQuart)'}
            _hover={{
              bg: 'yellow',
              color: 'black',
            }}
          >
            Start the project
          </chakra.a>
        </GridItem>
      </GridContent>
    </Flex>
  );
}
