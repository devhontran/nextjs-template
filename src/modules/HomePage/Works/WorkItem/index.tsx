import ImagePlaceHolder from '@/components/ImagePlaceHolder';
import { TypographyHeading, TypographyLabel, TypographyParagraph } from '@/components/Typography';

import Tags from '../../Tags';
import s from './styles.module.scss';

export default function WorkItem({
  title,
  description,
  image,
  tags,
  awards,
  link,
}: {
  title: string;
  description: string;
  image: string;
  tags: string[];
  awards: string[];
  link: string;
}): React.ReactElement {
  return (
    <div className={s.workItem}>
      <div className="grid grid-cols-10 gap-24">
        <div className={`${s.thumbnail} col-span-6`}>
          <ImagePlaceHolder src={image} alt="work-1" width={1600} height={900} />
        </div>
        <div className={`${s.content} col-span-3 col-start-8`}>
          <TypographyHeading className={s.title} size={80}>
            {title}
          </TypographyHeading>
          <Tags tags={tags} />
          <div className={s.description}>
            <TypographyParagraph size={18}>{description}</TypographyParagraph>
          </div>
          <ul className={s.awardList}>
            {awards.map((award) => (
              <li className={s.awardItem} key={award}>
                <TypographyLabel tag="span" size={12} className={s.awardText}>
                  {award}
                </TypographyLabel>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
