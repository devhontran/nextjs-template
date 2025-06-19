import { Box, Flex } from '@chakra-ui/react';

import { Heading } from '@/components/Typography';

import AwardRow from '../AwardRow';

export default function AwardItem(): React.ReactElement {
  return (
    <Flex direction={'column'} borderBottom="1px solid #555555">
      <Heading py="4rem" fontSize={'10rem'} height={'40rem'} fontWeight={'normal'}>
        <Box position={'sticky'} top={'calc(var(--header-height) + 2.4rem)'}>
          6× Awwwards Developer
        </Box>
      </Heading>
      <Flex direction={'column'} pb="2rem">
        <AwardRow />
        <AwardRow />
        <AwardRow />
        <AwardRow />
        <AwardRow />
      </Flex>
    </Flex>
  );
}
