import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import MenuItem from './MenuItem';
export default function Header(): React.ReactElement {
  return (
    <Box as="header" w="320px" height="100vh" position={'sticky'} top="0" left="0">
      <Flex h="100%" w="100%" direction="column" alignItems="center" justifyContent="center">
        <Box w="100%" flex="0 0 auto">
          HON
        </Box>
        <Flex w="100%" direction="column" gap="16px" flex="1" justifyContent="center">
          <MenuItem isActive={true} index={1}>
            About
          </MenuItem>
          <MenuItem index={2}>Services</MenuItem>
          <MenuItem index={3}>Projects</MenuItem>
          <MenuItem index={4}>Contact</MenuItem>
        </Flex>
      </Flex>
    </Box>
  );
}
