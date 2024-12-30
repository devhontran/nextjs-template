'use client';

import MotionLines, { MotionLinesType } from '@/animation/components/Typo/Lines';

import s from './styles.module.scss';

export default function HomePage(): JSX.Element {
  return (
    <section className={s.landingPage}>
      {/* <div className="flex">
        <div style={{ marginBottom: '50vh' }}>
          <MotionChars type={MotionCharsType.mask}>
            <h1 className={s.heading}>This is the Home Page</h1>
          </MotionChars>
        </div>
        <div style={{ marginBottom: '50vh' }}>
          <MotionLines motion={{ delayEnter: 0.2 }} type={MotionLinesType.fade}>
            <h1 className={s.heading}>This is the Home Page</h1>
          </MotionLines>
        </div>
      </div>
      <div className="flex">
        <div style={{ marginBottom: '50vh' }}>
          <MotionChars motion={{ delayEnter: 0.4 }} type={MotionCharsType.typing}>
            <h1 className={s.heading}>This is the Home Page</h1>
          </MotionChars>
        </div>
        <div style={{ marginBottom: '50vh' }}>
          <MotionLines motion={{ delayEnter: 0.6 }} type={MotionLinesType.fade}>
            <h1 className={s.heading}>This is the Home Page</h1>
          </MotionLines>
        </div>
      </div>
      <div className="flex">
        <div style={{ marginBottom: '50vh' }}>
          <MotionChars
            motion={{ delayEnter: 0.8, delayTrigger: 0 }}
            type={MotionCharsType.solidBox}
          >
            <h1 className={s.heading}>This is the Home Page</h1>
          </MotionChars>
        </div>
        <div style={{ marginBottom: '50vh' }}>
          <MotionLines motion={{ delayEnter: 1, delayTrigger: 0.2 }} type={MotionLinesType.fade}>
            <h1 className={s.heading}>This is the Home Page</h1>
          </MotionLines>
        </div>
      </div>
      <div className="flex">
        <div style={{ marginBottom: '50vh' }}>
          <MotionChars type={MotionCharsType.scale} motion={{ delayTrigger: 0 }}>
            <h1 className={s.heading}>This is the Home Page</h1>
          </MotionChars>
        </div>
        <div style={{ marginBottom: '50vh' }}>
          <MotionLines type={MotionLinesType.fade} motion={{ delayTrigger: 0.2 }}>
            <h1 className={s.heading}>This is the Home Page</h1>
          </MotionLines>
        </div>
      </div>
      <div className="flex">
        <div style={{ marginBottom: '50vh' }}>
          <MotionChars type={MotionCharsType.mask_top}>
            <h1 className={s.heading}>This is the Home Page</h1>
          </MotionChars>
        </div>
        <div style={{ marginBottom: '50vh' }}>
          <MotionLines type={MotionLinesType.fade} motion={{ delayTrigger: 0.2 }}>
            <h1 className={s.heading}>This is the Home Page</h1>
          </MotionLines>
        </div>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionChars type={MotionCharsType.mask_random}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionChars>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionChars type={MotionCharsType.mask_random}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionChars>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div>
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div> */}
      <div style={{ marginBottom: '50vh' }}>
        <MotionLines type={MotionLinesType.fade}>
          <h1 className={s.heading}>This is the Home Page</h1>
        </MotionLines>
      </div>
    </section>
  );
}
