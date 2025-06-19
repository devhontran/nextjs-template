import { Flex } from '@chakra-ui/react';

import SectionBlock from '../Components/SectionBlock';
import { WORKS } from '../mockup.data';
import WorkItem from './WorkItem';

export default function Works(): React.ReactElement {
  return (
    <SectionBlock title="Works">
      <Flex>
        {WORKS.map((work) => (
          <WorkItem key={work.title} {...work} />
        ))}
      </Flex>
    </SectionBlock>
  );
}
