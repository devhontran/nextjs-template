import { Box, Flex } from '@chakra-ui/react';
import { useSignal } from '@preact/signals-react';

import SectionBlock from '../Components/SectionBlock';
import { SERVICES } from '../mockup.data';
import ServiceBg from './ServiceBg';
import ServiceItem from './ServiceItem';

export default function Services(): React.ReactElement {
  const progressItem = useSignal(new Array(SERVICES.length).fill(0));
  return (
    <SectionBlock title="Services">
      <Box position={'relative'}>
        <ServiceBg />
        <Flex direction={'column'} gap={'24rem'}>
          {SERVICES.map((service, index) => (
            <ServiceItem
              progressItem={progressItem}
              index={index}
              key={service.title}
              {...service}
            />
          ))}
        </Flex>
      </Box>
    </SectionBlock>
  );
}
