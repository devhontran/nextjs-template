'use client';

import ImagePlaceHolder from '@Components/ImagePlaceHolder';
import ImagePreload from '@Components/ImagePreload';
import MotionPreview from '@Components/MotionPreview';

import MotionFadeBox from '@/animation/components/FadeBox';
import MotionImageParallax from '@/animation/components/ImageParallax';
import MotionMaskBox, { MaskBoxType } from '@/animation/components/MaskBox';
import MotionParallaxBox from '@/animation/components/ParallaxBox';
import MotionChars, { MotionCharsType } from '@/animation/components/Typo/Chars';
import MotionLines, { MotionLinesType } from '@/animation/components/Typo/Lines';
import MotionWords, { MotionWordsType } from '@/animation/components/Typo/Words';

import s from './styles.module.scss';

export default function MotionPage(): JSX.Element {
  return (
    <section className={s.landingPage}>
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <MotionPreview heading={'Motion Line Fade'}>
            <MotionLines type={MotionLinesType.fade}>
              <h1 className={s.heading}>Home title Section 1</h1>
            </MotionLines>
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

      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <MotionPreview heading={'Motion Chars - Type: Mask Random Char'}>
            <MotionChars type={MotionCharsType.mask_random}>
              <h1 className={s.heading}>Home title</h1>
            </MotionChars>
          </MotionPreview>
        </div>
        <div className="col-span-1">
          <MotionPreview heading={'Motion Chars - Type: Typing'}>
            <MotionChars type={MotionCharsType.typing}>
              <h1 className={s.heading}>Home title Section</h1>
            </MotionChars>
          </MotionPreview>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <MotionPreview heading={'Motion Words - Type: Fade slide left'}>
            <MotionWords type={MotionWordsType.fade_slide_left}>
              <h1 className={s.heading}>Home title home title</h1>
            </MotionWords>
          </MotionPreview>
        </div>
        <div className="col-span-1">
          <MotionPreview heading={'Motion Chars - Type: Mask From Top'}>
            <MotionChars type={MotionCharsType.mask_top}>
              <h1 className={s.heading}>Home title Section</h1>
            </MotionChars>
          </MotionPreview>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <MotionPreview heading={`Motion Mask Box - ${MaskBoxType.BOTTOM_CENTER}`}>
            <MotionMaskBox
              motion={{
                delayEnter: 0.25,
              }}
              direction={MaskBoxType.BOTTOM_CENTER}
            >
              <ImagePreload
                width={1200}
                height={900}
                src={
                  'https://images.unsplash.com/photo-1722152253464-4ad8cbec563f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
                  'https://images.unsplash.com/photo-1691157915037-68576ba139b1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
              'https://images.unsplash.com/photo-1721742145342-9aff08c0b7f7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt={''}
          />
        </MotionImageParallax>
      </MotionPreview>

      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <MotionPreview heading={'Motion Line Mask'}>
            <MotionLines type={MotionLinesType.mask}>
              <h1 className={s.heading}>Home Section title 2</h1>
            </MotionLines>
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

      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <MotionPreview heading={`Motion Parallax Box - speed: -.2`}>
            <MotionParallaxBox speed={-0.2}>
              <ImagePlaceHolder
                width={1200}
                height={900}
                src={
                  'https://images.unsplash.com/photo-1669428175954-0bcd9efe5dcd?q=80&w=2644&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
                alt={''}
              />
            </MotionParallaxBox>
          </MotionPreview>
        </div>
        <div className="col-span-1">
          <MotionPreview heading={`Motion Parallax Box - speed: .2`}>
            <MotionParallaxBox speed={0.2}>
              <ImagePlaceHolder
                width={1200}
                height={900}
                src={
                  'https://images.unsplash.com/photo-1721564130772-c9ee561ab87b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
                alt={''}
              />
            </MotionParallaxBox>
          </MotionPreview>
        </div>
      </div>

      <ImagePlaceHolder
        width={1200}
        height={1803}
        src={
          'https://images.unsplash.com/photo-1720451815682-3353b81a6633?q=80&w=2778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
              'https://images.unsplash.com/photo-1721981036255-2f673a5cf7a5?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt={''}
          />
        </MotionImageParallax>
      </MotionPreview>
    </section>
  );
}
