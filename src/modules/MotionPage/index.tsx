'use client';

import ImagePlaceHolder from '@Components/ImagePlaceHolder';
import MotionPreview from '@Components/MotionPreview';
import MotionFadeBox from '@Motions/FadeBox';
import MotionImageParallax from '@Motions/ImageParallax';
import MotionMaskBox, { MaskBoxType } from '@Motions/MaskBox';
import MotionChars from '@Motions/Typo/Chars';
import MotionLineFade from '@Motions/Typo/LineFade';
import MotionLineMask from '@Motions/Typo/LineMask';
import MotionWords from '@Motions/Typo/Words';

import s from './styles.module.scss';

export default function MotionPage(): JSX.Element {
  return (
    <section className={s.landingPage}>
      <MotionPreview heading={'Motion Line Fade'}>
        <MotionLineFade>
          <h1 className={s.heading}>Home title Section 1</h1>
        </MotionLineFade>
      </MotionPreview>

      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <MotionPreview heading={`Motion Mask Box - ${MaskBoxType.BOTTOM_CENTER}`}>
            <MotionMaskBox
              motion={{
                delayEnter: 0.25,
              }}
              direction={MaskBoxType.BOTTOM_CENTER}
            >
              <ImagePlaceHolder
                width={1200}
                height={900}
                src={
                  'https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
                alt={''}
              />
            </MotionMaskBox>
          </MotionPreview>
        </div>
        <div className="col-span-1">
          <MotionPreview heading={`Motion Mask Box - ${MaskBoxType.BOTTOM}`}>
            <MotionMaskBox
              motion={{
                delayEnter: 0.15,
              }}
              direction={MaskBoxType.BOTTOM}
            >
              <ImagePlaceHolder
                width={1200}
                height={900}
                src={
                  'https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
                alt={''}
              />
            </MotionMaskBox>
          </MotionPreview>
        </div>
      </div>
      <MotionPreview heading={`Motion Image Parallax`}>
        <MotionImageParallax scale={1.2} speed={1}>
          <ImagePlaceHolder
            width={1200}
            height={900}
            src={
              'https://images.unsplash.com/photo-1719937206491-ed673f64be1f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt={''}
          />
        </MotionImageParallax>
      </MotionPreview>

      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <MotionPreview heading={'Motion Line Mask'}>
            <MotionLineMask>
              <h1 className={s.heading}>Home Section title 2</h1>
            </MotionLineMask>
          </MotionPreview>
        </div>
        <div className="col-span-1">
          <MotionPreview heading={'Motion Chars'}>
            <MotionChars>
              <h1 className={s.heading}>Home Section title 3</h1>
            </MotionChars>
          </MotionPreview>
        </div>
      </div>

      <ImagePlaceHolder
        width={1200}
        height={1803}
        src={
          'https://images.unsplash.com/photo-1719937050792-a6a15d899281?q=80&w=2396&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        alt={''}
      />

      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <MotionPreview heading={'Motion Words'}>
            <MotionWords>
              <h1 className={s.heading}>Home section label fucking page 2</h1>
            </MotionWords>
          </MotionPreview>
        </div>
        <div className="col-span-1">
          <MotionPreview heading={'Motion Fade Box'}>
            <MotionFadeBox
              motion={{
                delayTrigger: 0.1,
              }}
            >
              <div>
                <ImagePlaceHolder
                  width={1200}
                  height={800}
                  src={
                    'https://images.unsplash.com/photo-1721170628026-7f98c620eac6?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                  }
                  alt={''}
                />
              </div>
            </MotionFadeBox>
          </MotionPreview>
        </div>
      </div>
      <MotionPreview heading={'Image Parallax'}>
        <MotionImageParallax speed={2} scale={1.2}>
          <ImagePlaceHolder
            width={1200}
            height={1803}
            src={
              'https://images.unsplash.com/photo-1719937050792-a6a15d899281?q=80&w=2396&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt={''}
          />
        </MotionImageParallax>
      </MotionPreview>
    </section>
  );
}
