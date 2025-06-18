'use client';
import { Box } from '@chakra-ui/react';
import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import { GridContainer } from '../Container';
import s from './DebugGrid.module.scss';

// Custom hook to manage grid state
const useGridToggle = (): { isGrid: boolean } => {
  const [isGrid, setIsGrid] = useState(false);
  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const key = ev.which || ev.keyCode;
      const isShift = !!ev.shiftKey;
      if (isShift && key === 71) {
        localStorage.setItem('isGrid', String(!isGrid));
        setIsGrid(!isGrid);
      }
    },
    [isGrid]
  );

  useEffect(() => {
    const localIsGrid = localStorage.getItem('isGrid');
    if (localIsGrid === 'true') {
      setIsGrid(true);
    }
    window.addEventListener('keydown', handleKeyDown);
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, isGrid]);

  return { isGrid };
};

// Grid column component for DRY code
const GridColumn = (): React.ReactElement => (
  <Box gridColumn="span 1">
    <div className={s.grid_col} />
  </Box>
);

export default function DebugGrid(): React.ReactElement {
  const { isGrid } = useGridToggle();

  return (
    <div className={cn(s.gridDebug, !isGrid && s.hidden)}>
      <GridContainer>
        {Array.from({ length: 12 }).map((_, index) => (
          <GridColumn key={`grid-column-${index.toString()}`} />
        ))}
      </GridContainer>
    </div>
  );
}
