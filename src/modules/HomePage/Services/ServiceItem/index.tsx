import ImagePlaceHolder from '@/components/ImagePlaceHolder';
import { TypographyHeading, TypographyParagraph } from '@/components/Typography';

import s from './styles.module.scss';

export default function ServiceItem(): React.ReactElement {
  return (
    <div className={s.serviceItem}>
      <div className="grid grid-cols-10 gap-24">
        <div className={`${s.thumbnail} col-span-6`}>
          <ImagePlaceHolder
            src="/images/service-1.jpeg"
            alt="service-1"
            width={1600}
            height={900}
          />
        </div>
        <div className={`${s.content} col-span-3 col-start-8`}>
          <TypographyHeading className={s.title} size={48}>
            Webflow Developer – Creating Elegant, Optimized Web Projects
          </TypographyHeading>
          <div className={s.description}>
            <TypographyParagraph size={18}>
              I offer expert Webflow development services, creating beautiful, responsive, and
              user-friendly websites tailored to your needs. With a strong focus on design and
              performance optimization, I deliver high-quality, custom-built websites that are easy
              to manage and maintain. My commitment to seamless user experience and attention to
              detail sets me apart in every project.
            </TypographyParagraph>
          </div>
        </div>
      </div>
    </div>
  );
}
