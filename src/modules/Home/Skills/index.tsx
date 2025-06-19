import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import SectionBlock from '../Components/SectionBlock';

export default function Skills(): React.ReactElement {
  return (
    <SectionBlock title="Skills">
      <Box h="calc(100vh - var(--header-height))">
        <Text>
          <strong>Skills</strong>
        </Text>
      </Box>
    </SectionBlock>
  );
}
