'use client';
import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import s from './styles.module.scss';

export default function DebugGrid(): React.ReactElement {
  const [isGird, setIsGrid] = useState(false);
  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      const key = ev.which || ev.keyCode;
      const isShift = !!ev.shiftKey;
      if (isShift && key === 71) {
        localStorage.setItem('isGrid', String(!isGird));
        setIsGrid(!isGird);
      }
    },
    [isGird]
  );

  useEffect(() => {
    const localIsGrid = localStorage.getItem('isGrid');
    if (localIsGrid === 'true') {
      setIsGrid(true);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, isGird]);

  return (
    <div className={cn(s.gridDebug, isGird ? '' : 'hidden')}>
      <div className={cn('container')}>
        <div className="grid grid-cols-10 gap-24">
          <div className="col-span-1">
            <div className={s.grid_col} />
          </div>
          <div className="col-span-1">
            <div className={s.grid_col} />
          </div>
          <div className="col-span-1">
            <div className={s.grid_col} />
          </div>
          <div className="col-span-1">
            <div className={s.grid_col} />
          </div>
          <div className="col-span-1">
            <div className={s.grid_col} />
          </div>
          <div className="col-span-1">
            <div className={s.grid_col} />
          </div>
          <div className="col-span-1">
            <div className={s.grid_col} />
          </div>
          <div className="col-span-1">
            <div className={s.grid_col} />
          </div>
          <div className="col-span-1">
            <div className={s.grid_col} />
          </div>
          <div className="col-span-1">
            <div className={s.grid_col} />
          </div>
        </div>
      </div>
    </div>
  );
}
