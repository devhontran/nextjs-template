import { Heading } from '@/components/Typography';

import { SERVICES } from '../mockup.data';
import ServiceItem from './ServiceItem';
import s from './styles.module.scss';

export default function Services(): React.ReactElement {
  return (
    <div className="container">
      <Heading className={s.title} size={140}>
        Creating <strong>amazing things</strong> in digital development.
      </Heading>
      <div className={s.services}>
        {SERVICES.map((service) => (
          <ServiceItem key={service.title} {...service} />
        ))}
      </div>
    </div>
  );
}
