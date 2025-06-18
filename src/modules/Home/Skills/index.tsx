import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';

import { Paragraph } from '@/components/Typography';

import s from './styles.module.scss';

export default function Skills(): React.ReactElement {
  return (
    <Flex className={s.skills}>
      <Flex>
        <Heading>Amplify your impact</Heading>
        <Paragraph>aptivating designs thet effectively communicate your uniqu</Paragraph>
        <Button>Get Started</Button>
      </Flex>
      <Box outline="1px solid red">matthjs</Box>
    </Flex>
  );
}
