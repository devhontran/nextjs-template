import { GridItem } from '@chakra-ui/react';
import React, { type PropsWithChildren } from 'react';

import Animation from '@/animation';
import { GridContainer } from '@/components/Container';
import DebugGrid from '@/components/DebugGrid';
import MenuControllerProvider from '@/providers/MenuControllerProvider';

import Header from '../Header';
import Webgl from '../Webgl';
export default function MainLayout({ children }: PropsWithChildren): React.ReactElement {
  return (
    <>
      <Animation>
        <MenuControllerProvider>
          <GridContainer>
            <GridItem colSpan={1}>
              <Header />
            </GridItem>
            <GridItem colSpan={11} colStart={2}>
              {children}
              <Webgl />
            </GridItem>
          </GridContainer>
        </MenuControllerProvider>
        <DebugGrid />
      </Animation>
      {/*<MobileDisabledRotation />*/}
    </>
  );
}
