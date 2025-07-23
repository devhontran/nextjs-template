'use client';

import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import { useSignal, useSignalEffect } from '@preact/signals-react';
import classNames from 'classnames';
import gsap from 'gsap';
import { useRef } from 'react';

import { useAfterPageEnter } from '@/animation/hooks/useEffectHooks';
import ImgSvg from '@/components/ImgSvg';
import { Label, Paragraph } from '@/components/Typography';
import { useIsInViewport } from '@/hooks/useIsInViewport';

import BtnPrevNext from './BtnPrevNext';
import Description from './Description';
import styles from './styles.module.scss';
import VideoEl from './VideoEl';

interface Props {
  data: StrapiIllustrationVideo[];
}
export default function VideoPartMobile({ data }: Props): React.ReactElement | null {
  const refVideos = useRef<HTMLVideoElement[]>([]);
  const refDescs = useRef<React.RefObject<IRefInteraction | null>[]>([]);
  const refContainer = useRef<HTMLDivElement>(null);
  const { visible } = useIsInViewport({
    ref: refContainer,
  });
  const currentIndex = useSignal(0);
  const isPlaying = useSignal(true);
  const refBtnPrevMotion = useRef<IRefMotion | null>(null);
  const refBtnNextMotion = useRef<IRefMotion | null>(null);
  const isShowPrevBtn = useSignal<boolean>(false);
  const isShowNextBtn = useSignal<boolean>(true);
  const prevIndexRef = useRef<number | null>(null);
  const refButons = useRef<HTMLDivElement>(null);
  const isLastVideLoopPlaying = useRef(false);

  const playPart = (videoElement: HTMLVideoElement): void => {
    videoElement.currentTime = 0;
    void videoElement.play();

    gsap.to(videoElement, {
      opacity: 1,
      zIndex: 2,
      ease: 'power3.out',
      duration: 0.3,
    });
  };

  const actionMotion = (
    videoPlay?: HTMLVideoElement,
    videoStop?: HTMLVideoElement,
    isLast?: boolean
  ): void => {
    videoStop &&
      gsap.to(videoStop, {
        opacity: 0,
        ease: 'power3.inOut',
        duration: 0.3,
        onComplete: () => {
          videoStop.pause();
        },
      });
    videoPlay && playPart(videoPlay);
    if (isLast) {
      isPlaying.value = false;
      isLastVideLoopPlaying.current = true;
    }
  };

  const enableScrolling = (): void => {
    isPlaying.value = false;
  };

  //todo: hontran fix mobile videos
  useAfterPageEnter((isReady) => {
    const crIdx = currentIndex.value;
    if (data.length === 1 || !isReady) return;

    const nextIndex: number = crIdx;
    const prevIndex = prevIndexRef.current;
    const nextVideo: HTMLVideoElement | undefined = refVideos.current[nextIndex];
    const prevVideo: HTMLVideoElement | undefined =
      prevIndex !== null ? refVideos.current[prevIndex] : undefined;

    isPlaying.value = true;
    prevIndex !== null && refDescs.current[prevIndex]?.current?.motionOut?.();
    refDescs.current[nextIndex]?.current?.motionIn?.({
      delay: data[nextIndex].timingTrigger,
      onComplete: () => {
        enableScrolling();
      },
    });

    const isNext = nextIndex > (prevIndex ?? 0);
    if (!isNext && isLastVideLoopPlaying.current) {
      const videoLast = refVideos.current[data.length - 1];

      videoLast.pause();
      gsap.to(videoLast, {
        opacity: 0,
        zIndex: 1,
        ease: 'power3.inOut',
        duration: 0.3,
      });
      isLastVideLoopPlaying.current = false;
    }

    actionMotion(nextVideo, prevVideo);
    prevIndexRef.current = nextIndex;
  });

  useGSAP(() => {
    if (!refContainer.current) return;

    data.forEach((item, index) => {
      if (item.loopVideo) {
        refVideos.current[index]?.addEventListener('ended', () => {
          refVideos.current[index] && (refVideos.current[index].currentTime = 0);
          void refVideos.current[index]?.play();
        });
      }

      if (index === data.length - 1 && !item.description && item.loopVideo) {
        refVideos.current[index - 1]?.addEventListener('ended', () => {
          if (
            refVideos.current[index] &&
            refVideos.current[index - 1] &&
            currentIndex.peek() === data.length - 2
          ) {
            actionMotion(refVideos.current[index], refVideos.current[index - 1], true);
          }
        });
      }
    });

    const videosIgnoreFirst = refVideos.current.slice(1);
    gsap.set(videosIgnoreFirst, {
      opacity: 0,
      zIndex: 1,
    });
  });

  const generateLayoutDescs = (layout: string): string => {
    switch (layout) {
      case 'layout_1':
        return styles.layout_1;
      case 'layout_2':
        return styles.layout_2;
      case 'layout_3':
        return styles.layout_3;
      default:
        return styles.layout_1;
    }
  };

  useSignalEffect(() => {
    if (visible.value) {
      const crIdx = currentIndex.peek();
      if (data.length === 1) {
        refDescs.current[crIdx].current?.motionIn?.({
          onComplete: enableScrolling,
        });
        refVideos.current[crIdx] && playPart(refVideos.current[0]);
        return;
      }

      if (crIdx === 0 && prevIndexRef.current === null) {
        isPlaying.value = true;
        refVideos.current[crIdx] && playPart(refVideos.current[crIdx]);
        refDescs.current[crIdx].current?.motionIn?.({
          onComplete: enableScrolling,
        });
        prevIndexRef.current ??= crIdx;
      }
    }
  });

  useSignalEffect(() => {
    if (currentIndex.value === data.length - 2) {
      refBtnNextMotion.current?.motionOut();
      isShowNextBtn.value = false;
    }
    if (currentIndex.value < data.length - 2) {
      if (!isShowNextBtn.value) {
        refBtnNextMotion.current?.motionIn();
        isShowNextBtn.value = true;
      }
    }
    if (currentIndex.value == 0) {
      refBtnPrevMotion.current?.motionOut();
      isShowPrevBtn.value = false;
    }
    if (currentIndex.value == 1) {
      if (!isShowPrevBtn.value) {
        refBtnPrevMotion.current?.motionIn();
        isShowPrevBtn.value = true;
      }
    }
  });

  useSignalEffect(() => {
    gsap.killTweensOf(refButons.current);
    gsap.to(refButons.current, {
      opacity: isPlaying.value ? 0.5 : 1,
      ease: 'power3.inOut',
      pointerEvents: isPlaying.value ? 'none' : 'auto',
      duration: 0.3,
    });
  });

  return (
    <Box height={'100lvh'} position="relative">
      <Box ref={refContainer} top={0} h="100lvh" w="100vw">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          maskImage="linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.8015581232492998) 20%,
            rgba(0, 0, 0, 1) 50%,
            rgba(0, 0, 0, 0.7959558823529411) 80%,
            rgba(0, 0, 0, 0) 100%
          )"
          willChange={'transform'}
        >
          {data.map((item, index) => (
            <VideoEl
              key={item.vimeoUrl}
              src={item.vimeoUrl}
              refVideo={(el) => {
                if (el) {
                  refVideos.current[index] = el;
                }
              }}
            />
          ))}
        </Box>
        {data.map((item, index) => {
          if (item.description) {
            return (
              <Description
                key={item.vimeoUrl}
                ref={(el: IRefInteraction | null) => {
                  if (el) {
                    refDescs.current[index] = { current: el };
                  }
                }}
                className={classNames(
                  styles.description,
                  generateLayoutDescs(
                    item.descriptionLayout ?? StrapiIllustrationVideoDescriptionLayout.LAYOUT_1
                  )
                )}
              >
                <Paragraph size={32}>{item.description}</Paragraph>
              </Description>
            );
          }
        })}

        {data.length > 1 && (
          <Box ref={refButons}>
            <BtnPrevNext
              refMotionControl={refBtnPrevMotion}
              bottom={'2.4rem'}
              left={'2.4rem'}
              onClick={() => {
                if (isPlaying.value) return;
                currentIndex.value -= 1;
              }}
              text="Previous"
            >
              <div className={styles.icon_wrapper}>
                <ImgSvg src={'/icons/ic_chevron-left.svg'} alt={'arrow'} width={20} height={20} />
              </div>
              <Label size={16} fontWeight={400} className={styles.button_txt} as="div">
                Previous
              </Label>
            </BtnPrevNext>
            <BtnPrevNext
              refMotionControl={refBtnNextMotion}
              bottom={'2.4rem'}
              right={'2.4rem'}
              onClick={() => {
                if (isPlaying.value) return;
                currentIndex.value += 1;
              }}
            >
              <Label size={16} fontWeight={400} className={styles.button_txt} as="div">
                Next
              </Label>
              <div className={styles.icon_wrapper}>
                <ImgSvg src={'/icons/ic_arrow_btn.svg'} alt={'arrow'} width={20} height={20} />
              </div>
            </BtnPrevNext>
          </Box>
        )}
      </Box>
    </Box>
  );
}
