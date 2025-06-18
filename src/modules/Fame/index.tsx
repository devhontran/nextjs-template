import { Box, Button, Flex, Text } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

interface FameProps extends PropsWithChildren {
  title: string;
}

export default function Fame({ title, children }: FameProps): React.ReactElement {
  return (
    <Box>
      <Flex>
        <Button>phong to</Button>
        <Button>thu nho</Button>
        <Button>Tắt</Button>
      </Flex>
      <Box>
        <Text>{title}</Text>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}
