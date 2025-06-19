import { GridItem, Text } from '@chakra-ui/react';

import { GridContent } from '@/components/Container';

export default function AwardRow(): React.ReactElement {
  return (
    <GridContent borderTop="1px solid #555555" py=".8rem">
      <GridItem colSpan={1}>
        <Text fontSize={'1.2rem'}>2020</Text>
      </GridItem>
      <GridItem colSpan={4} colStart={4}>
        <Text fontSize={'1.2rem'}>Minpham.site</Text>
      </GridItem>
      <GridItem colSpan={1} colStart={9}>
        <Text fontSize={'1.2rem'}>VietName</Text>
      </GridItem>
    </GridContent>
  );
}
