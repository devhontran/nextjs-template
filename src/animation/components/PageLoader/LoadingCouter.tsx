import { Box, Flex } from '@chakra-ui/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { RefObject } from 'react';
import { useImperativeHandle, useRef } from 'react';

import Counter from '../Counter';

export default function LoadingCounter({
  refCounter,
}: {
  refCounter: RefObject<ILoadingCounterRef | null>;
}): React.ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const refTr = useRef<{ update: (count: number) => void } | null>(null);
  const refCh = useRef<{ update: (count: number) => void } | null>(null);
  const refDv = useRef<{ update: (count: number) => void } | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      const items = gsap.utils.toArray('.js-mask-item');

      gsap.set(items, {
        xPercent: -100,
      });
    },
    { scope: refContent }
  );

  useImperativeHandle(refCounter, () => {
    return {
      update: (count: number): void => {
        const tr = Math.floor(count / 100);
        const ch = Math.floor(count / 10) % 10;
        const dv = count % 10;

        refTr.current?.update(tr);
        refCh.current?.update(ch);
        refDv.current?.update(dv);
      },
      motionIn: contextSafe(() => {
        const items = gsap.utils.toArray('.js-mask-item');
        gsap.to(items, {
          xPercent: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.005,
        });
      }),
      motionOut: contextSafe(() => {
        const items = gsap.utils.toArray('.js-mask-item');
        gsap.to(items, {
          xPercent: 100,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.005,
        });
      }),
    };
  });

  return (
    <Flex
      ref={refContent}
      css={{
        '& .counter-item': {
          paddingTop: '0.2em',
          paddingBottom: '0.2em',
          marginBottom: '-0.2em',
          paddingLeft: '0.01em',
          paddingRight: '0.01em',
        },
      }}
    >
      <Box overflow={'clip'} pb=".2em" mb="-.2em">
        <Box className="js-mask-item">
          <Counter refCounter={refTr} />
        </Box>
      </Box>
      <Box overflow={'clip'} pb=".2em" mb="-.2em">
        <Box className="js-mask-item">
          <Counter refCounter={refCh} />
        </Box>
      </Box>
      <Box overflow={'clip'} pb=".2em" mb="-.2em">
        <Box className="js-mask-item">
          <Counter refCounter={refDv} />
        </Box>
      </Box>
    </Flex>
  );
}
