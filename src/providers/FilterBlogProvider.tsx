import type { Signal } from '@preact/signals-react';
import { useSignal } from '@preact/signals-react';
import type { ReactNode } from 'react';
import React, { createContext, use, useMemo, useState } from 'react';

interface FilterBlogContextProps {
  filter: string;
  setFilter: (filter: string) => void;
  selectedTag: Signal<string>;
  setSelectedTag: (value: string) => void;
}

const FilterBlogContext = createContext<FilterBlogContextProps | undefined>(undefined);

export const useFilterBlog = (): FilterBlogContextProps => {
  const context = use(FilterBlogContext);
  if (!context) {
    throw new Error('useFilterBlog must be used within a FilterBlogProvider');
  }
  return context;
};

interface FilterBlogProviderProps {
  children: ReactNode;
}

export const FilterBlogProvider = ({ children }: FilterBlogProviderProps): React.ReactElement => {
  const [filter, setFilter] = useState<string>('');
  const selectedTag = useSignal('all');

  const setSelectedTag = (value: string): void => {
    // eslint-disable-next-line react-compiler/react-compiler
    selectedTag.value = value;
  };

  const contextValue = useMemo(
    () => ({ filter, setFilter, selectedTag, setSelectedTag }),
    [filter, setFilter, selectedTag, setSelectedTag]
  );

  return <FilterBlogContext value={contextValue}>{children}</FilterBlogContext>;
};
