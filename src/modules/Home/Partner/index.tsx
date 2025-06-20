import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { GridContent } from '@/components/Container';

import SectionBlock from '../Components/SectionBlock';

export default function Partner(): React.ReactElement {
  return (
    <SectionBlock title="Our Partners">
      <GridContent textTransform="uppercase">
        <GridItem colSpan={2}>
          <Text fontSize="clamp(12px, 12rem, 14px)">Huy Phan</Text>
        </GridItem>
        <GridItem colSpan={2} colStart={6}>
          <Text fontSize="clamp(12px, 12rem, 14px)">Designer</Text>
        </GridItem>
        <GridItem colSpan={2} colStart={10}>
          <Text fontSize="clamp(12px, 12rem, 14px)" color="yellow">
            Since 2018
          </Text>
        </GridItem>
      </GridContent>
      <GridContent>
        <GridItem colSpan={5}>
          <Box bg="red" height="100%" width="100%">
            <Image
              src="https://images.unsplash.com/photo-1745933115134-9cd90e3efcc7?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="partner-1"
              width={100}
              height={100}
            />
          </Box>
        </GridItem>
        <GridItem colSpan={6}>
          <Grid templateColumns="repeat(6, 1fr)" gap={'var(--space-16)'}>
            <GridItem colSpan={2}>
              <Text>Kin</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text>Kin</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text>Kin</Text>
            </GridItem>
          </Grid>
        </GridItem>
      </GridContent>
    </SectionBlock>
  );
}
