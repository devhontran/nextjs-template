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
    <div className={cn(s.gridDebug, isGird ? '' : 'd-none')}>
      <div className={cn('container')}>
        <div className="row containerGap">
          <div className="col-sm-1 col col--1">
            <div className={s.grid_col} />
          </div>
          <div className="col-sm-1 col col--2">
            <div className={s.grid_col} />
          </div>
          <div className="col-sm-1 col col--3">
            <div className={s.grid_col} />
          </div>
          <div className="col-sm-1 col col--4">
            <div className={s.grid_col} />
          </div>
          <div className="col-1 col--5 d-sm-block d-none">
            <div className={s.grid_col} />
          </div>
          <div className="col-1 col--6 d-sm-block d-none">
            <div className={s.grid_col} />
          </div>
          <div className="col-1 col--7 d-sm-block d-none">
            <div className={s.grid_col} />
          </div>
          <div className="col-1 col--8 d-sm-block d-none">
            <div className={s.grid_col} />
          </div>
          <div className="col-1 col--9 d-sm-block d-none">
            <div className={s.grid_col} />
          </div>
          <div className="col-1 col--10 d-sm-block d-none">
            <div className={s.grid_col} />
          </div>
        </div>
      </div>
    </div>
  );
}
