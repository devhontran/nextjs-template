'use client';

import {
  ChakraProvider as Chakra,
  createSystem,
  defaultConfig,
  defineConfig,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

interface ChakraProviderProps {
  children: ReactNode;
}

export function ChakraProvider({ children }: ChakraProviderProps): React.ReactElement {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return <></>;

  const config = defineConfig({
    theme: {
      breakpoints: {
        sm: '768px',
        md: '1200px',
        lg: '1440px',
      },
    },
  });

  const customSystem = createSystem(defaultConfig, config);
  return <Chakra value={customSystem}>{children}</Chakra>;
}
