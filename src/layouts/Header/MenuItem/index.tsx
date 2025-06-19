import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export default function MenuItem({
  children,
  isActive,
  index,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  index: number;
}): React.ReactElement {
  return (
    <Flex direction="column" gap="16px">
      <Text fontSize="12px">{`0${index}`}</Text>
      <Box position={'relative'} borderLeft={'2px solid #ddd'} height={isActive ? '10vh' : '0'}>
        <Box borderLeft={'2px solid yellow'} position={'absolute'} top="0" left="0" height="50%" />
      </Box>
      <Text fontSize="14px" textTransform={'uppercase'}>
        {children}
      </Text>
    </Flex>
  );
}
