import { Flex } from '@chakra-ui/react';
import React, { type PropsWithChildren } from 'react';

import Animation from '@/animation';
import DebugGrid from '@/components/DebugGrid';
import LenisScroller from '@/components/Lenis';
import MenuControllerProvider from '@/providers/MenuControllerProvider';

import Header from '../Header';
export default function MainLayout({ children }: PropsWithChildren): React.ReactElement {
  return (
    <>
      <Animation>
        <MenuControllerProvider>
          <Flex>
            <Header />
            <LenisScroller>{children}</LenisScroller>
          </Flex>
        </MenuControllerProvider>
        <DebugGrid />
      </Animation>
      {/*<MobileDisabledRotation />*/}
    </>
  );
}
