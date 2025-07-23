'use client';

import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import { useSignal } from '@preact/signals-react';
import classNames from 'classnames';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ReactElement, useRef } from 'react';

import { useCursorContext } from '@/animation/contexts/CursorContext';
import { usePageEnter } from '@/animation/hooks/useEffectHooks';
import { Paragraph } from '@/components/Typography';
import { CursorType } from '@/enum/animation';
import useWinResize from '@/hooks/useWinResize';
import { MathMap } from '@/utils/mathUtils';

import BtnSkip from './BtnSkip';
import Description from './Description';
import styles from './styles.module.scss';
import VideoEl from './VideoEl';
import VideoPartMobile from './VideoPartMobile';

interface ExtendedHTMLVideoElement extends HTMLVideoElement {
  reset?: () => void;
}

interface Props {
  data: StrapiIllustrationVideo[];
}

function VideoPart({ data }: Props): ReactElement {
  const refVideos = useRef<HTMLVideoElement[]>([]);
  const refDescs = useRef<React.RefObject<IRefInteraction | null>[]>([]);
  const refContainer = useRef<HTMLDivElement>(null);

  const currentIndex = useSignal(0);
  const isPlaying = useSignal(true);
  const isSkipAnimation = useSignal(false);
  const isSkipOnHover = useSignal(false);
  const isLeaveBack = useSignal(false);
  const scroller = useRef<ScrollTrigger>(null);
  const scroller_2 = useRef<ScrollTrigger>(null);
  const refBtnSkipMotion = useRef<IRefMotion | null>(null);

  const refIntentObserver = useRef<Observer>(null);

  const { setCursorType } = useCursorContext();

  const playPart = (videoElement: HTMLVideoElement, onComplete?: () => void): void => {
    isPlaying.value = true;
    setCursorType(CursorType.DEFAULT);
    void videoElement.play();
    gsap.to(videoElement, {
      opacity: 1,
      zIndex: 2,
      ease: 'power3',
      duration: 0.3,
      onComplete,
    });
  };

  const actionMotion = (videoElement: HTMLVideoElement, videoElPrev: HTMLVideoElement): void => {
    gsap.set([...refVideos.current], {
      zIndex: 0,
    });
    gsap.set(videoElPrev, { zIndex: 1 });
    playPart(videoElement, () => {
      videoElPrev.pause();
    });
  };

  const enableScrolling = (): void => {
    isPlaying.value = false;
    if (!isSkipOnHover.peek()) setCursorType(CursorType.SCROLL);
    if (currentIndex.peek() === 2) {
      window.lenis?.start();
      refIntentObserver.current?.disable();
    }
  };

  useGSAP(() => {
    gsap.registerPlugin(Observer, ScrollTrigger);
    if (!refContainer.current) return;

    data.forEach((item, index) => {
      if (item.loopVideo) {
        refVideos.current[index]?.addEventListener('ended', () => {
          refVideos.current[index] && (refVideos.current[index].currentTime = 0);
          void refVideos.current[index]?.play();
        });
      }

      //last video: no desc + have to loop + data.length - 1
      if (index === data.length - 1 && !item.description && item.loopVideo) {
        refVideos.current[index - 1]?.addEventListener('ended', () => {
          refVideos.current[index] &&
            refVideos.current[index - 1] &&
            actionMotion(refVideos.current[index], refVideos.current[index - 1]);
        });
      }
    });

    const videosIgnoreFirst = refVideos.current.slice(1);
    gsap.set(videosIgnoreFirst, {
      opacity: 0,
      zIndex: 1,
    });

    refIntentObserver.current = ScrollTrigger.observe({
      type: 'wheel,touch',
      onUp: (): void => {
        if (isPlaying.value || isSkipAnimation.value) return;

        // eslint-disable-next-line react-compiler/react-compiler
        currentIndex.value += 1;
        const nextIndex: number = currentIndex.value;
        const prevIndex: number = nextIndex - 1;

        const videoElement: HTMLVideoElement | undefined = refVideos.current[nextIndex];
        const videoElPrev: HTMLVideoElement | undefined = refVideos.current[prevIndex];

        if (nextIndex > 0) {
          refDescs.current[prevIndex]?.current?.motionOut?.();

          const onComplete = (): void => {
            enableScrolling();
            if (nextIndex === 2) {
              refBtnSkipMotion.current?.motionOut();
            }
          };

          refDescs.current[nextIndex]?.current?.motionIn?.({
            delay: data[nextIndex].timingTrigger,
            onComplete,
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (videoElement && videoElPrev) {
          actionMotion(videoElement, videoElPrev);
        }
      },
      onDown: (): void => {
        if (isPlaying.value) return;
        window.lenis?.start();

        refIntentObserver.current?.disable();
        refDescs.current[currentIndex.value]?.current?.motionOut?.();
        setCursorType(CursorType.DEFAULT);
        isPlaying.value = true;
      },
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      onPress: (self) => {
        ScrollTrigger.isTouch && self.event.preventDefault();
      },
    });

    refIntentObserver.current.disable();

    scroller.current = ScrollTrigger.create({
      trigger: refContainer.current,
      start: 'center+=45% center',
      end: 'center+=50% top',
      onEnter: (self) => {
        if (isSkipAnimation.peek()) return;
        if (isLeaveBack.peek()) {
          refBtnSkipMotion.current?.motionIn();
          isLeaveBack.value = false;
        }

        if (data.length === 1) {
          window.lenis?.start();
          refIntentObserver.current?.disable();
          refDescs.current[currentIndex.value].current?.motionIn?.({
            onComplete: enableScrolling,
          });
          refVideos.current[currentIndex.value] && playPart(refVideos.current[0]);
          return;
        }

        if (currentIndex.value < 2) {
          window.lenis?.stop();
          self.scroll(self.start);
          refIntentObserver.current?.enable();
        }

        refDescs.current[currentIndex.value].current?.motionIn?.({
          onComplete: enableScrolling,
        });
        if (currentIndex.value === 0) {
          refVideos.current[currentIndex.value] && playPart(refVideos.current[currentIndex.value]);
        }
      },
      onLeaveBack: () => {
        if (isSkipAnimation.value) {
          refDescs.current[currentIndex.value]?.current?.motionOut?.();
          setCursorType(CursorType.DEFAULT);
          isPlaying.value = true;
          isSkipAnimation.value = false;
          isSkipOnHover.value = false;
          isLeaveBack.value = true;
        } else if (currentIndex.value > 1) {
          refDescs.current[currentIndex.value]?.current?.motionOut?.();
        }
      },
      onLeave: () => {
        setCursorType(CursorType.DEFAULT);
      },
    });

    scroller_2.current = ScrollTrigger.create({
      trigger: refContainer.current,
      start: 'top bottom',
      end: 'bottom top-=50%',
      onUpdate: (self) => {
        const sTop = MathMap(self.progress, 0, 0.4, 100, 0);
        const sBottom = MathMap(self.progress, 0.4, 0.6, 100, 30);
        const opa = MathMap(self.progress, 0.4, 0.6, 0, 0.5);
        const sTran = MathMap(self.progress, 0.6, 1, 0, 100);

        refContainer.current?.style.setProperty(
          '--mask-top',
          `${Math.max(Math.min(sTop, 100), 0)}%`
        );
        refContainer.current?.style.setProperty(
          '--mask-bottom',
          `${Math.max(Math.min(sBottom, 100), 0)}%`
        );

        refContainer.current?.style.setProperty(
          '--sTran',
          `${Math.max(Math.min(sTran, 100), 0) * 0.5}%`
        );

        refContainer.current?.style.setProperty('--opa', `${Math.max(Math.min(opa, 0.5), 0)}`);
      },
      onLeaveBack: () => {
        if (data.length === 1) {
          return;
        }

        refDescs.current.forEach((desc) => {
          desc.current?.motionOut?.();
        });

        currentIndex.value = 0;

        refVideos.current.forEach((video) => {
          video.pause();
          video.currentTime = 0;
        });

        refVideos.current.slice(0, -1).forEach((video) => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          (video as ExtendedHTMLVideoElement)?.reset?.();
        });

        gsap.set(refVideos.current.slice(1), {
          opacity: 0,
          zIndex: 1,
        });

        isSkipAnimation.value = false;
        isSkipOnHover.value = false;
        isLeaveBack.value = true;
        isPlaying.value = true;
        setCursorType(CursorType.DEFAULT);
        refBtnSkipMotion.current?.motionOut();
      },
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

  usePageEnter(() => {
    scroller.current?.refresh();
    scroller_2.current?.refresh();
  });

  return (
    <Box height={'150lvh'}>
      <Box
        ref={refContainer}
        css={{
          '--mask-top': '100%',
          '--mask-bottom': '100%',
          '--sTran': '0%',
          '--opa': '0',
        }}
        position="sticky"
        top={0}
        h="100lvh"
        w="100vw"
        onMouseLeave={() => {
          setCursorType(CursorType.DEFAULT);
        }}
        onMouseEnter={() => {
          if (isPlaying.peek()) return;
          setCursorType(CursorType.SCROLL);
        }}
        overflow={'clip'}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          transform={`translateY(calc(var(--sTran) / 2))`}
          maskImage="linear-gradient(180deg, rgba(0, 0, 0, var(--opa)) var(--mask-top), rgba(0, 0, 0, 1) var(--mask-bottom))"
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
        {data.length > 1 ? (
          <BtnSkip
            refMotionControl={refBtnSkipMotion}
            onClick={() => {
              isSkipAnimation.value = true;
              refIntentObserver.current?.disable();
              window.lenis?.start();
              setCursorType(CursorType.SCROLL);
            }}
            onMouseEnter={() => {
              isSkipOnHover.value = true;
              !isPlaying.peek() && setCursorType(CursorType.DEFAULT);
            }}
            onMouseLeave={() => {
              isSkipOnHover.value = false;
              !isPlaying.peek() && !isSkipAnimation.peek() && setCursorType(CursorType.SCROLL);
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
}

export default function WrapperVideoPart({ data }: Props): ReactElement {
  const { isDesktop } = useWinResize();
  return isDesktop ? <VideoPart data={data} /> : <VideoPartMobile data={data} />;
}
