import Link from 'next/link';

import ImagePlaceHolder from '@/components/ImagePlaceholder';
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
    <Link href={link} className={s.workItem}>
      <div className="grid grid-cols-10 gap-24">
        <div className={`${s.thumbnail} col-span-6`}>
          <div className={`${s.metadata} flex items-center justify-between`}>
            <TypographyLabel size={12} className={s.year}>
              2024
            </TypographyLabel>
            <TypographyLabel size={12} className={s.type}>
              Personal
            </TypographyLabel>
            <TypographyLabel size={12} className={s.country}>
              Vietnam
            </TypographyLabel>
          </div>
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
    </Link>
  );
}
