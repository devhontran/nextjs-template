'use client';

import MotionPreview from '@Components/MotionPreview';
import MotionChars, { MotionCharsType } from '@Motions/Typo/Chars';
import MotionLineFade from '@Motions/Typo/LineFade';

import s from './styles.module.scss';

export default function InteractivePage(): JSX.Element {
  return (
    <section className={s.landingPage}>
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <MotionPreview heading={'Motion Line Fade'}>
            <MotionLineFade>
              <h1 className={s.heading}>Home title Section 1</h1>
            </MotionLineFade>
          </MotionPreview>
        </div>
        <div className="col-span-1">
          <MotionPreview heading={'Motion Chars - Type: Scale'}>
            <MotionChars type={MotionCharsType.scale}>
              <h1 className={s.heading}>Home title Section 1</h1>
            </MotionChars>
          </MotionPreview>
        </div>
      </div>
    </section>
  );
}
