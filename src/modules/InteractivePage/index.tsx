'use client';

import MotionPreview from '@Components/MotionPreview';
import InteractiveCharsScale from '@Interactive/CharsScale';
import InteractiveVariable from '@Interactive/Variable';

import s from './styles.module.scss';

export default function InteractivePage(): JSX.Element {
  return (
    <section className={s.landingPage}>
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <MotionPreview heading={'Interactive Variable Font'}>
            <InteractiveVariable>
              <h1 className={s.heading}>Lorem Ipsum</h1>
            </InteractiveVariable>
          </MotionPreview>
        </div>
        <div className="col-span-1">
          <MotionPreview heading={'Interactive Chars Scale: Center'}>
            <InteractiveCharsScale>
              <h1 className={s.heading}>Lorem Ipsum</h1>
            </InteractiveCharsScale>
          </MotionPreview>
        </div>
      </div>
    </section>
  );
}
