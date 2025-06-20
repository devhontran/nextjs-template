import { Box, Flex } from '@chakra-ui/react';

import { Label } from '@/components/Typography';

interface SectionBlockProps {
  title: string;
  children: React.ReactNode;
}
export default function SectionBlock({ title, children }: SectionBlockProps): React.ReactElement {
  return (
    <Flex direction={'column'} gap="2rem">
      <Box height={'24rem'}>
        <Label
          fontSize={'clamp(12px, 1.4rem, 16px)'}
          position={'sticky'}
          top={'calc(var(--header-height) + 2.4rem)'}
          textTransform={'uppercase'}
          letterSpacing={'.2em'}
          fontWeight={'black'}
        >
          {title}
        </Label>
      </Box>
      {children}
    </Flex>
  );
}
