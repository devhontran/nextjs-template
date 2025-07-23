import { Box } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { RefObject } from 'react';
import { useImperativeHandle, useMemo, useRef } from 'react';

export default function Counter({
  refCounter,
}: {
  refCounter: RefObject<{ update: (count: number) => void } | null>;
}): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const ListNumber = useMemo(() => {
    return Array.from({ length: 10 }).map((_, index) => `item-${index}`);
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      const items = ref.current?.querySelectorAll('.js-number');
      items?.forEach((item, index) => {
        const position = index;

        gsap.set(item, {
          xPercent: -100 * position,
        });
      });
    },
    { scope: ref, dependencies: ListNumber }
  );

  const initPosition = contextSafe((isInit: boolean, count: number) => {
    const mx = count % 10;
    const items = ref.current?.querySelectorAll('.js-number');
    items?.forEach((item, index) => {
      // const position = ((index - mx + 15) % 10) - 5;
      // const isSet = Math.abs(position) > 2;

      const position = index - (mx % 10);
      // const opacity = 1;
      // const isSet = false;

      gsap.killTweensOf(item);
      isInit
        ? gsap.set(item, {
            xPercent: -100 * position,
          })
        : gsap.to(item, {
            xPercent: -100 * position,
            duration: 0.6,
            ease: 'power3.inOut',
          });
    });
  });

  useImperativeHandle(refCounter, () => {
    return {
      update: (count: number): void => {
        initPosition(false, count);
      },
    };
  });

  return (
    <Box position={'relative'} ref={ref} overflow={'clip'}>
      {ListNumber.map((num, index) => (
        <Box
          display={'block'}
          textAlign={'center'}
          key={num}
          willChange={'transform'}
          className="js-number counter-item"
          css={
            index !== 0 && {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }
          }
        >
          {index}
        </Box>
      ))}
    </Box>
  );
}
