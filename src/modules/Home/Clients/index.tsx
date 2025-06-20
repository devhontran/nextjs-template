import { GridItem, Text } from '@chakra-ui/react';

import { GridContent } from '@/components/Container';

import SectionBlock from '../Components/SectionBlock';

export default function Clients(): React.ReactElement {
  return (
    <SectionBlock title="Clients">
      <GridContent>
        <GridItem>
          <Text>Clients</Text>
        </GridItem>
      </GridContent>
    </SectionBlock>
  );
}
