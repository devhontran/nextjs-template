'use client';

import ImagePlaceHolder from '@Components/ImagePlaceHolder';
import MotionPreview from '@Components/MotionPreview';
import { usePageForeEnter } from '@Layouts/Animation/usePageStatus';
import MotionMaskBox from '@Motions/MaskBox';
import MotionLineFade from '@Motions/Typo/LineFade';

import s from './styles.module.scss';

export default function AboutPage(): JSX.Element {
  // usePageBeforeLeave(() => {
  //   console.log('_____ABOUT LEAVE');
  // });

  usePageForeEnter(() => {
    console.log('___about use page before Enter');
  });

  // usePageEnter(() => {
  //   console.log('___about use page Enter');
  // });

  // return (
  //   <MotionPreview heading={'Motion Line Fade'}>
  //     <MotionLineFade>
  //       <h1 className={s.heading}>About title Section 1</h1>
  //     </MotionLineFade>
  //   </MotionPreview>
  // );
  return (
    <section className={s.landingPage}>
      <MotionPreview heading={'Motion Line Fade'}>
        <MotionLineFade
          motion={{
            delayEnter: 5,
          }}
        >
          <h1 className={s.heading}>About title Section 1</h1>
        </MotionLineFade>
      </MotionPreview>

      <MotionPreview heading={'Motion Mask Box'}>
        <MotionMaskBox
          motion={{
            delayEnter: 0.15,
          }}
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

      {/*<MotionPreview heading={'Motion Line Mask'}>*/}
      {/*  <MotionLineMask>*/}
      {/*    <h1 className={s.heading}>About Section title 2</h1>*/}
      {/*  </MotionLineMask>*/}
      {/*</MotionPreview>*/}
      {/*<ImagePlaceHolder*/}
      {/*  width={1200}*/}
      {/*  height={1803}*/}
      {/*  src={*/}
      {/*    'https://images.unsplash.com/photo-1719937050792-a6a15d899281?q=80&w=2396&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'*/}
      {/*  }*/}
      {/*  alt={''}*/}
      {/*/>*/}

      {/*<MotionPreview heading={'Motion Chars'}>*/}
      {/*  <MotionChars>*/}
      {/*    <h1 className={s.heading}>About Section title 3</h1>*/}
      {/*  </MotionChars>*/}
      {/*</MotionPreview>*/}
      {/*<ImagePlaceHolder*/}
      {/*  width={1200}*/}
      {/*  height={800}*/}
      {/*  src={*/}
      {/*    'https://images.unsplash.com/photo-1721613884660-14099d377f02?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'*/}
      {/*  }*/}
      {/*  alt={''}*/}
      {/*/>*/}
      {/*<MotionPreview heading={'Motion Fade Box'}>*/}
      {/*  <MotionFadeBox*/}
      {/*    motion={{*/}
      {/*      delayTrigger: 0.1,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <div>*/}
      {/*      <ImagePlaceHolder*/}
      {/*        width={1200}*/}
      {/*        height={800}*/}
      {/*        src={*/}
      {/*          'https://images.unsplash.com/photo-1721170628026-7f98c620eac6?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'*/}
      {/*        }*/}
      {/*        alt={''}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </MotionFadeBox>*/}
      {/*</MotionPreview>*/}
      {/*<MotionPreview heading={'Motion Words'}>*/}
      {/*  <MotionWords>*/}
      {/*    <h1 className={s.heading}>About section label fucking page 2</h1>*/}
      {/*  </MotionWords>*/}
      {/*</MotionPreview>*/}

      {/*<MotionPreview heading={'Motion Mask Box'}>*/}
      {/*  <MotionMaskBox*/}
      {/*    motion={{*/}
      {/*      delayEnter: 2,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <ImagePreload*/}
      {/*      width={1200}*/}
      {/*      height={800}*/}
      {/*      src={*/}
      {/*        'https://images.unsplash.com/photo-1721763604802-21cc60882810?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'*/}
      {/*      }*/}
      {/*      alt={''}*/}
      {/*    />*/}
      {/*  </MotionMaskBox>*/}
      {/*</MotionPreview>*/}
    </section>
  );
}
