import ImageParallax from '@/animation/components/ImageParallax';

import s from './styles.module.scss';
export default function Hero(): React.ReactElement {
  return (
    <div className={s.hero}>
      <div className="container">
        <div className={s.hero_inner}>
          <ImageParallax speed={0.5} scale={1.1}>
            <video src="/videos/13226680_3840_2160_25fps.mp4" autoPlay muted loop playsInline />
          </ImageParallax>
        </div>
      </div>
    </div>
  );
}
