import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import s from './Header.module.scss';
export default function Header(): React.ReactElement {
  return (
    <header className={s.header}>
      <Flex>
        <Box>HON</Box>
        <Flex>
          <Text>About</Text>
          <Text>Services</Text>
          <Text>Projects</Text>
          <Text>Contact</Text>
        </Flex>
      </Flex>
    </header>
  );
}
