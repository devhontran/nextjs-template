import { Box, Flex, GridItem } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

import { GridContainer } from '@/components/Container';
import { Label } from '@/components/Typography';

import MenuItem from './MenuItem';
export default function Header(): React.ReactElement {
  return (
    <>
      <Box
        position={'fixed'}
        top="0"
        left="0"
        w="100%"
        zIndex={2}
        borderBottom={'1px solid #555555'}
        bg="#000"
        py="16px"
      >
        <GridContainer>
          <GridItem colSpan={1} colStart={2}>
            <Label fontSize={'14px'}>
              HONTRAN. <br />
              DEV
            </Label>
          </GridItem>
          <GridItem colSpan={2} colStart={7}>
            <Label fontSize={'14px'}>
              CREATIVE <br /> DEVELOPER IN SAIGON
            </Label>
          </GridItem>
          <GridItem colSpan={2} colStart={11}>
            <Label fontSize={'14px'} css={{ '& strong': { color: 'yellow' } }}>
              <strong>AVAILABLE</strong> <br />
              FOR FREELANCE
            </Label>
          </GridItem>
        </GridContainer>
      </Box>
      <Box
        as="header"
        height="100vh"
        position={'sticky'}
        px="16px"
        top="0"
        left="0"
        zIndex={3}
        borderRight={'1px solid #555555'}
      >
        <Flex h="100%" direction="column" alignItems="center" justifyContent="center">
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            height={'var(--header-height)'}
            w="100%"
            flex="0 0 auto"
          >
            <Image src="/logo-white.svg" alt="logo" width={40} height={40} unoptimized />
          </Flex>
          <Flex w="100%" direction="column" gap="16px" flex="1" justifyContent="center">
            <MenuItem isActive={true} index={1}>
              About
            </MenuItem>
            <MenuItem index={2}>Services</MenuItem>
            <MenuItem index={3}>Projects</MenuItem>
            <MenuItem index={4}>Contact</MenuItem>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
