import { GridItem } from '@chakra-ui/react';

import VideoScrolling from '@/animation/components/VideoScrolling';
import { GridContent } from '@/components/Container';

import SectionBlock from '../Components/SectionBlock';

export default function Contact(): React.ReactElement {
  return (
    <SectionBlock title="Contact">
      <GridContent>
        <GridItem colSpan={6} colStart={3}>
          <VideoScrolling />
        </GridItem>
      </GridContent>
    </SectionBlock>
  );
}
