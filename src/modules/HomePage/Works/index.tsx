import { TypographyHeading } from '@/components/Typography';

import s from './styles.module.scss';
import WorkItem from './WorkItem';

export default function Works(): React.ReactElement {
  return (
    <div className="container">
      <TypographyHeading className={s.title} size={140}>
        Feature Works
      </TypographyHeading>
      <div className={s.works}>
        <WorkItem />
        <WorkItem />
        <WorkItem />
      </div>
    </div>
  );
}
