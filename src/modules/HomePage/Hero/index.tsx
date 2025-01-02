import Image from 'next/image';

import MotionImageParallax from '@/animation/components/ImageParallax';

import s from './styles.module.scss';
export default function Hero(): React.ReactElement {
  return (
    <div className={s.hero}>
      <MotionImageParallax speed={0.5} scale={1.1}>
        <Image src="/images/bg-covert.jpg" alt="hero" width={1920} height={770} />
      </MotionImageParallax>
    </div>
  );
}
