'use client';
import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import s from './styles.module.scss';

// Custom hook to manage grid state
const useGridToggle = (): { isGrid: boolean } => {
  const [isGrid, setIsGrid] = useState(false);

  const toggleGrid = useCallback(() => {
    const newState = !isGrid;
    localStorage.setItem('isGrid', String(newState));
    setIsGrid(newState);
  }, [isGrid]);

  // Initialize from localStorage
  useEffect(() => {
    const localIsGrid = localStorage.getItem('isGrid');
    if (localIsGrid === 'true') {
      setIsGrid(true);
    }
  }, []);

  // Handle keyboard shortcut (Shift+G)
  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent): void => {
      // Use ev.key instead of deprecated which/keyCode
      if (ev.shiftKey && ev.key === 'g') {
        toggleGrid();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return (): void => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleGrid]);

  return { isGrid };
};

// Grid column component for DRY code
const GridColumn = (): React.ReactElement => (
  <div className="col-span-1">
    <div className={s.grid_col} />
  </div>
);

export default function DebugGrid(): React.ReactElement {
  const { isGrid } = useGridToggle();

  return (
    <div className={cn(s.gridDebug, !isGrid && 'hidden')}>
      <div className={cn('container')}>
        <div className="grid grid-cols-10 gap-24">
          {Array.from({ length: 10 }).map((_, index) => (
            <GridColumn key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
