'use client';

import type { Signal } from '@preact/signals-react';
import { useSignal } from '@preact/signals-react';
import type { ReactNode } from 'react';
import React, { createContext, use, useMemo } from 'react';

interface Context {
  isOpenMenu: Signal<boolean | null>;
  openMenu: () => void;
  closeMenu: () => void;
}

const MenuControllerContext = createContext<Context | undefined>(undefined);

export const useMenuController = (): Context => {
  const context = use(MenuControllerContext);

  if (!context) {
    throw new Error('useMegaMenu must be used within a MegaMenuProvider');
  }

  return context;
};

interface Props {
  children: ReactNode;
}

const MenuControllerProvider: React.FC<Props> = ({ children }) => {
  const isOpenMenu = useSignal<boolean | null>(null);

  const openMenu = (): void => {
    // eslint-disable-next-line react-compiler/react-compiler
    isOpenMenu.value = true;
  };

  const closeMenu = (): void => {
    isOpenMenu.value = false;
  };

  const contextValue = useMemo(
    () => ({ isOpenMenu, openMenu, closeMenu }),
    [isOpenMenu, openMenu, closeMenu]
  );

  return <MenuControllerContext value={contextValue}>{children}</MenuControllerContext>;
};

export default MenuControllerProvider;
