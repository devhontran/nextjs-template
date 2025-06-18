import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { ReactElement } from 'react';
import { useRef } from 'react';

import { fameCurrent } from '@/animation/components/FameScrolling/useFameScrollingStore';
import { MathMap } from '@/utils/mathUtils';

import s from './FameScrolling.module.scss';

interface IProps {
  className?: string;
  urlFrame: string;
  totalFrames: number;
  willLoad?: number;
  height?: number;
  width?: number;
  firstFame?: number;
}

interface IRefDomFrames {
  currentFrame: number;
  images: { image: HTMLImageElement; frame: number }[];
  progress: number;
  framesFirstLoad: number;
  currentUrlFrame?: string;
  ctx: CanvasRenderingContext2D | null;
  canvas?: HTMLCanvasElement;
  isLoaded: boolean;
  runFrame: null | (() => void);
}

export default function FameScrolling({
  className = '',
  urlFrame = '',
  totalFrames = 0,
  height = 1080,
  width = 1920,
  firstFame = 0,
  willLoad = 25,
}: IProps): ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const refCanavs = useRef<HTMLCanvasElement>(null);
  const refDom = useRef<IRefDomFrames>({
    currentFrame: 0,
    images: [],
    progress: 0,
    framesFirstLoad: willLoad - 1,
    ctx: null,
    isLoaded: false,
    runFrame: null,
  });

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const registerImgDom = (frame: number, step = false): void => {
        if (frame > totalFrames) return;
        for (let i = frame; i < frame + willLoad; i++) {
          if (i > totalFrames) return;
          if (
            refDom.current.currentUrlFrame &&
            refDom.current.images[i] instanceof HTMLImageElement
          ) {
            refDom.current.images[i] = { image: document.createElement('img'), frame: i };
            refDom.current.images[i].image.src = refDom.current.currentUrlFrame.replace(
              '%d',
              Math.floor(i).toString()
            );
          }

          if (step) return;
        }
      };

      const drawFrame = (image: HTMLImageElement): void => {
        if (image.complete && image.naturalHeight !== 0) {
          refDom.current.ctx?.clearRect(
            0,
            0,
            refDom.current.canvas?.width ?? window.innerWidth,
            refDom.current.canvas?.height ?? window.innerHeight
          );
          refDom.current.ctx?.drawImage(
            image as CanvasImageSource,
            0,
            0,
            width || 1920,
            height || 1080
          );
        }
      };

      const loadFrame = (frame: number, onLoaded?: () => void): void => {
        refDom.current.currentUrlFrame ??= urlFrame;

        if (frame > totalFrames || !refDom.current.images[frame]) return;
        registerImgDom(frame, true);
        refDom.current.images[frame].image.onload = (): void => {
          if (!onLoaded) {
            if (refDom.current.currentFrame === refDom.current.images[frame].frame) {
              drawFrame(refDom.current.images[frame].image);
            }
          } else {
            onLoaded();
          }
        };
      };

      const loadFirstFrame = (): void => {
        const checkLoaded: Record<string, number> = { value: firstFame - 1 };
        for (let i = firstFame || 0; i <= refDom.current.framesFirstLoad; i++) {
          loadFrame(i, (): void => {
            checkLoaded.value++;
            if (checkLoaded.value >= refDom.current.framesFirstLoad) {
              drawFrame(refDom.current.images[firstFame].image);
              runCanvas();
            }
          });
        }
      };

      const runFrame = (): void => {
        const progress = refDom.current.progress || 0;

        const frameTmp: number = MathMap(progress, 0, 1, firstFame || 0, totalFrames);
        const frame = Math.floor(frameTmp);
        fameCurrent.value = frame;

        if (frame !== refDom.current.currentFrame) {
          refDom.current.currentFrame = frame;
          if (!refDom.current.images[frame]) {
            loadFrame(frame);
          } else if (
            refDom.current.images[frame] &&
            refDom.current.currentFrame === refDom.current.images[frame].frame
          ) {
            registerImgDom(frame + refDom.current.framesFirstLoad);
            drawFrame(refDom.current.images[frame].image);
          }
        }
      };

      const runCanvas = (): void => {
        if (!refContent.current || !refCanavs.current) return;

        const rect: DOMRect | undefined = refContent.current.getBoundingClientRect();
        refCanavs.current.width = width || rect.width || window.innerWidth;
        refCanavs.current.height = height || rect.height || window.innerHeight;
        refDom.current.ctx = refCanavs.current.getContext('2d');

        runFrame();
      };

      if (!refDom.current.isLoaded) {
        refDom.current.isLoaded = true;
        loadFirstFrame();
      }

      ScrollTrigger.create({
        trigger: refContent.current,
        start: 'center center',
        pin: true,
        end: () => `${MathMap(totalFrames, 0, 15, 0, window.innerHeight).toString()}px center`,
        onUpdate: (self: ScrollTrigger) => {
          refDom.current.progress = self.progress;
          runFrame();
        },
      });

      ScrollTrigger.refresh();
    },
    { dependencies: [refContent] }
  );

  return (
    <div className={classNames(className, s.fame)} ref={refContent}>
      <canvas ref={refCanavs} />
    </div>
  );
}
