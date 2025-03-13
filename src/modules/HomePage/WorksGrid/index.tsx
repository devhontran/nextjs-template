import { TypographyHeading } from '@/components/Typography';

import { WORKS } from '../mockup.data';
import s from './styles.module.scss';
import WorkItem from './WorkItem';

export default function Works(): React.ReactElement {
  return (
    <div className="container">
      <TypographyHeading className={s.title} size={140}>
        Works.
      </TypographyHeading>
      <div className={s.works}>
        {WORKS.map((work) => (
          <WorkItem key={work.title} {...work} />
        ))}
      </div>
    </div>
  );
}
