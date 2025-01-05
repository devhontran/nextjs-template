import ImagePlaceHolder from '@/components/ImagePlaceHolder';
import { TypographyHeading, TypographyParagraph } from '@/components/Typography';

import Tags from '../../Tags';
import s from './styles.module.scss';

export default function WorkItem({
  title,
  description,
  image,
  tags,
  link,
}: {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}): React.ReactElement {
  return (
    <div className={s.workItem}>
      <div className="grid grid-cols-10 gap-24">
        <div className={`${s.thumbnail} col-span-6`}>
          <ImagePlaceHolder src={image} alt="work-1" width={1600} height={900} />
        </div>
        <div className={`${s.content} col-span-3 col-start-8`}>
          <TypographyHeading className={s.title} size={48}>
            {title}
          </TypographyHeading>
          <div className={s.description}>
            <TypographyParagraph size={18}>{description}</TypographyParagraph>
          </div>
          <Tags tags={tags} />
        </div>
      </div>
    </div>
  );
}
