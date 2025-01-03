import { TypographyHeading } from '@/components/Typography';

import ServiceItem from './ServiceItem';
import s from './styles.module.scss';

export default function Services(): React.ReactElement {
  return (
    <div className="container">
      <TypographyHeading className={s.title} size={140}>
        Services
      </TypographyHeading>
      <div className={s.services}>
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
      </div>
    </div>
  );
}
