import { Box, chakra, Flex } from '@chakra-ui/react';

import { Heading } from '@/components/Typography';

import s from './styles.module.scss';
export default function Hero(): React.ReactElement {
  return (
    <div className={s.hero}>
      <div className="container">
        <Flex direction={'column'} gap="3rem" py="12rem">
          <Heading fontSize={'3rem'} textTransform={'uppercase'} textAlign={'center'}>
            Hon Q. Tran
          </Heading>
          <Heading
            fontSize={'12rem'}
            fontWeight={'bold'}
            textAlign={'center'}
            textTransform={'uppercase'}
          >
            Founder <br /> Creative Developer <br /> at hontran.dev
          </Heading>
          <Heading fontSize={'3rem'} textTransform={'uppercase'} textAlign={'center'}>
            From HCM, Vietnam
          </Heading>
        </Flex>
        <Box w="100%" h="40vh" overflow={'clip'} borderRadius={'1rem'}>
          <chakra.video
            w="100%"
            height={'100%'}
            objectFit={'cover'}
            src="/videos/13226680_3840_2160_25fps.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </Box>
      </div>
    </div>
  );
}
